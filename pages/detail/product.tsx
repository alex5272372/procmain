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
  { key: 'isHidden', name: 'Hidden' }
]

const ProductDetail: NextPage = () => {
  const query: DocumentNode = gql`
  query ProductObject($id: Int!) {
    productObject(id: $id) {
      id
      name
      isDeleted
      isHidden
    }
  }`

  const mutation: DocumentNode = gql`
  mutation UpdateProduct($id: Int!, $data: ProductInput!) {
    updateProduct(id: $id, data: $data) { id }
  }`

  const router = useRouter()
  const [getData, { loading, error, data }] = useLazyQuery(query)

  useEffect(() => {
    if (router.query.id) getData({ variables: { id: parseInt(router.query.id as string) }})
  }, [getData, router.query.id])

  const [updateData, { loading: loadingM, error: errorM }] = useMutation(mutation)
  const [dataState, dispatchData] = useReducer(dataReducer, {})

  const toolbar = useMemo(() => ({
    variables: { id: data?.productObject.id },
    dataState,
    dispatchData,
    updateData
  }), [data?.productObject.id, dataState, updateData])

  const statusesProp: { key: string, name: string, checked: boolean }[] = useMemo(
    () => statuses.map((st: { key: string, name: string }) => ({ ...st, checked: data?.productObject[st.key] })),
    [data?.productObject]
  )

  const Main: NextPage<{ toolbar: any }> = ({ toolbar }) => {
    return <>
      <Status statuses={statusesProp} toolbar={toolbar} />
      <Input
        keyProp="name"
        name="Name"
        title={data?.productObject?.name}
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
    loading={{ ProductDetail: loading, ProductDetailM: loadingM }}
    errors={errorsProp}
  />
}

export default ProductDetail
