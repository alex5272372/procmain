import { NextPage } from 'next'
import Layout from '../../components/Layout'
import DetailToolbar from '../../components/DetailToolbar'
import { DocumentNode, gql, useLazyQuery, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useReducer } from 'react'
import Status from '../../components/elements/Status'
import { dataReducer } from '../../lib'
import Input from '../../components/elements/Input'

export const statuses = [
  { key: 'isDeleted', name: 'Deleted' },
  { key: 'isSuspended', name: 'Suspended' },
  { key: 'isEmailVerified', name: 'Email verified' }
]

const UserDetail: NextPage = () => {
  const query: DocumentNode = gql`
  query UserObject($id: Int!) {
    userObject(id: $id) {
      id
      email
      isDeleted
      isSuspended
      isEmailVerified
    }
  }`

  const mutation: DocumentNode = gql`
  mutation UpdateUser($id: Int!, $data: UserInput!) {
    updateUser(id: $id, data: $data) { id }
  }`

  const router = useRouter()
  const [getData, { loading, error, data }] = useLazyQuery(query)

  useEffect(() => {
    if (router.query.id) getData({ variables: { id: parseInt(router.query.id as string) }})
  }, [getData, router.query.id])

  const [updateData, { loading: loadingM, error: errorM }] = useMutation(mutation)
  const [dataState, dispatchData] = useReducer(dataReducer, {})

  const toolbar = useMemo(() => ({
    variables: { id: data?.userObject.id },
    dataState,
    dispatchData,
    updateData
  }), [data?.userObject.id, dataState, updateData])

  const statusesProp: { key: string, name: string, checked: boolean }[] = useMemo(
    () => statuses.map((st: { key: string, name: string }) => ({ ...st, checked: data?.userObject[st.key] })),
    [data?.userObject]
  )

  const Main: NextPage<{ toolbar: any }> = ({ toolbar }) => {
    return <>
      <Status statuses={statusesProp} toolbar={toolbar} />
      <Input
        keyProp="email"
        name="Email"
        title={data?.userObject?.email}
        toolbar={toolbar}
      />
    </>
  }

  const errorsProp: Error[] = []
  if (error) errorsProp.push(error)
  if (errorM) errorsProp.push(errorM)

  return <Layout
    Toolbar={DetailToolbar}
    Main={Main}
    toolbar={toolbar}
    loading={{ UserDetail: loading, UserDetailM: loadingM }}
    errors={errorsProp}
  />
}

export default UserDetail
