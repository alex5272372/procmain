import { ApolloCache, DefaultContext, gql, MutationTuple, OperationVariables, useMutation } from '@apollo/client'
import { faCheck, faEdit, faLink, faRightLeft, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NextPage } from 'next'
import router from 'next/router'
import { useEffect, useMemo } from 'react'
import { splitKey } from '../../../lib/grid'

type DeleteMutations = Record<string, {
  delete: MutationTuple<any, OperationVariables, DefaultContext, ApolloCache<any>>
  mark?: MutationTuple<any, OperationVariables, DefaultContext, ApolloCache<any>>
  change?: Record<string, MutationTuple<any, OperationVariables, DefaultContext, ApolloCache<any>>>
}>

const DeletionGridToolbar: NextPage<{ toolbar: any, dispatch: any }> = ({ toolbar, dispatch }) => {
  const mutations: DeleteMutations = {
    candidate: {
      delete: useMutation(gql`
        mutation DeleteCandidate($id: Int!) { deleteCandidate(id: $id) { userId }}`),
      mark: useMutation(gql`
        mutation MarkCandidate($id: Int!) {
          updateCandidate(id: $id, data: { statuses: { isDeleted: true }}) { userId }}`),
      change: {
        portfolio: useMutation(gql`
          mutation ChangeCandidatePortfolio($id: Int!, $target: Int) {
            updateCandidate(id: $id, data: { portfolio: $target }) { userId }}`),
        resume: useMutation(gql`
          mutation ChangeCandidateResume($id: Int!, $target: Int) {
            updateCandidate(id: $id, data: { resume: $target }) { userId }}`)
      }
    },
    candidate_industry: {
      delete: useMutation(gql`
        mutation DeleteCandidateIndustry($candidate: Int!, $industry: Int!) {
          deleteCandidateIndustry(candidate: $candidate, industry: $industry) { candidate, industry }}`),
      change: {
        industry: useMutation(gql`
          mutation ChangeCandidateIndustry($candidate: Int!, $industry: Int!, $target: Int!) {
            deleteCandidateIndustry(candidate: $candidate, industry: $industry) { candidate, industry }
            createCandidateIndustry(candidate: $candidate, industry: $target) { candidate, industry }}`)
      }
    },
    company: {
      delete: useMutation(gql`
        mutation DeleteCompany($id: Int!) { deleteCompany(id: $id) { id }}`),
      mark: useMutation(gql`
        mutation MarkCompany($id: Int!) {
          updateCompany(id: $id, data: { statuses: { isDeleted: true }}) { id }}`)
    },
    contact: {
      delete: useMutation(gql`
        mutation DeleteContact($id: Int!) { deleteContact(id: $id) { id }}`),
      mark: useMutation(gql`
        mutation MarkContact($id: Int!) {
          updateContact(id: $id, data: { statuses: { isDeleted: true }}) { id }}`)
    },
    industry: {
      delete: useMutation(gql`
        mutation DeleteIndustry($id: Int!) { deleteIndustry(id: $id) { id }}`),
      mark: useMutation(gql`
        mutation MarkIndustry($id: Int!) {
          updateIndustry(id: $id, data: { statuses: { isDeleted: true }}) { id }}`)
    },
    job: {
      delete: useMutation(gql`
        mutation DeleteJob($id: Int!) { deleteJob(id: $id) { id }}`),
      mark: useMutation(gql`
        mutation MarkJob($id: Int!) {
          updateJob(id: $id, data: { statuses: { isDeleted: true }}) { id }}`),
      change: {
        industry: useMutation(gql`
          mutation UpdateJobIndustry($id: Int!, $target: Int) {
            updateJob(id: $id, data: { industry: $target }) { id }}`)
      }
    },
    message: {
      delete: useMutation(gql`
        mutation DeleteMessage($id: Int!) { deleteMessage(id: $id) { id }}`),
      mark: useMutation(gql`
        mutation MarkMessage($id: Int!) {
          updateMessage(id: $id, data: { statuses: { isDeleted: true }}) { id }}`)
    },
    position: {
      delete: useMutation(gql`
        mutation DeletePosition($id: Int!) { deletePosition(id: $id) { id }}`),
      mark: useMutation(gql`
        mutation MarkPosition($id: Int!) {
          updatePosition(id: $id, data: { statuses: { isDeleted: true }}) { id }}`)
    },
    recruiter: {
      delete: useMutation(gql`
        mutation DeleteRecruiter($id: Int!) { deleteRecruiter(id: $id) { userId }}`),
      mark: useMutation(gql`
        mutation MarkRecruiter($id: Int!) {
          updateRecruiter(id: $id, data: { statuses: { isDeleted: true }}) { userId }}`),
      change: {
        company: useMutation(gql`
          mutation ChangeRecruiterCompany($id: Int!, $target: Int) {
            updateRecruiter(id: $id, data: { company: $target}) { userId }}`)
      }
    },
    relation: {
      delete: useMutation(gql`
        mutation DeleteRelation($candidateid: Int!, $recruiterId: Int!) {
          deleteRelation(candidateId: $candidateid, recruiterId: $recruiterId) { candidateId, recruiterId }}`),
      mark: useMutation(gql`
        mutation MarkRelation($candidateId: Int!, $recruiterId: Int!) { 
          updateRelation(candidateId: $candidateId, recruiterId: $recruiterId,
          data: { statuses: { isDeleted: true }}) { candidateId, recruiterId }}`),
      change: {
        candidate_first_name_id: useMutation(gql`
          mutation ChangeRelationCandidateFirstNameId($candidateId: Int!, $recruiterId: Int!, $target: Int) { 
            updateRelation(candidateId: $candidateId, recruiterId: $recruiterId,
            data: { candidateFirstNameId: $target}) { candidateId, recruiterId }}`),
        candidate_last_name_id: useMutation(gql`
          mutation ChangeRelationCandidateLastNameId($candidateId: Int!, $recruiterId: Int!, $target: Int) { 
            updateRelation(candidateId: $candidateId, recruiterId: $recruiterId,
            data: { candidateLastNameId: $target}) { candidateId, recruiterId }}`),
        candidate_phone_id: useMutation(gql`
          mutation ChangeRelationCandidatePhoneId($candidateId: Int!, $recruiterId: Int!, $target: Int) { 
            updateRelation(candidateId: $candidateId, recruiterId: $recruiterId,
            data: { candidatePhoneId: $target}) { candidateId, recruiterId }}`),
        candidate_linkedin_id: useMutation(gql`
        mutation ChangeRelationCandidateLinkedinId($candidateId: Int!, $recruiterId: Int!, $target: Int) { 
          updateRelation(candidateId: $candidateId, recruiterId: $recruiterId,
          data: { candidateLinkedinId: $target}) { candidateId, recruiterId }}`),
        candidate_github_id: useMutation(gql`
          mutation ChangeRelationCandidateGithubId($candidateId: Int!, $recruiterId: Int!, $target: Int) { 
            updateRelation(candidateId: $candidateId, recruiterId: $recruiterId,
            data: { candidateGithubId: $target}) { candidateId, recruiterId }}`),
        candidate_portfolio_id: useMutation(gql`
          mutation ChangeRelationCandidatePortfolioId($candidateId: Int!, $recruiterId: Int!, $target: Int) { 
            updateRelation(candidateId: $candidateId, recruiterId: $recruiterId,
            data: { candidatePortfolioId: $target}) { candidateId, recruiterId }}`),
        candidate_resume_id: useMutation(gql`
          mutation ChangeRelationCandidateResumeId($candidateId: Int!, $recruiterId: Int!, $target: Int) { 
            updateRelation(candidateId: $candidateId, recruiterId: $recruiterId,
            data: { candidateResumeId: $target}) { candidateId, recruiterId }}`)
      }
    },
    skill: {
      delete: useMutation(gql`
        mutation DeleteSkill($id: Int!) { deleteSkill(id: $id) { id }}`),
      mark: useMutation(gql`
        mutation MarkSkill($id: Int!) {
          updateSkill(id: $id, data: { statuses: { isDeleted: true }}) { id }}`)
    },
    user: {
      delete: useMutation(gql`
        mutation DeleteUser($id: Int!) { deleteUser(id: $id) { id }}`),
      mark: useMutation(gql`
        mutation MarkUser($id: Int!) {
          updateUser(id: $id, data: { statuses: { isDeleted: true }}) { id }}`),
      change: {
        first_name: useMutation(gql`
          mutation ChangeUserFirstName($id: Int!, $target: Int) {
            updateUser(id: $id, data: { firstName: $target }) { id }}`),
        last_name: useMutation(gql`
          mutation ChangeUserLastName($id: Int!, $target: Int) {
            updateUser(id: $id, data: { lastName: $target }) { id }}`),
        phone: useMutation(gql`
          mutation ChangeUserPhone($id: Int!, $target: Int) {
            updateUser(id: $id, data: { phone: $target }) { id }}`),
        linkedin: useMutation(gql`
          mutation ChangeUserLinkedin($id: Int!, $target: Int) {
            updateUser(id: $id, data: { linkedin: $target }) { id }}`),
        github: useMutation(gql`
          mutation ChangeUserGithub($id: Int!, $target: Int) {
            updateUser(id: $id, data: { github: $target }) { id }}`)
      }
    }
  }

  const loading = useMemo(() =>
    mutations.candidate.delete[1].loading || mutations.candidate.mark && mutations.candidate.mark[1].loading
    || mutations.company.delete[1].loading || mutations.company.mark && mutations.company.mark[1].loading
    || mutations.contact.delete[1].loading || mutations.contact.mark && mutations.contact.mark[1].loading
    || mutations.industry.delete[1].loading || mutations.industry.mark && mutations.industry.mark[1].loading
    || mutations.job.delete[1].loading || mutations.job.mark && mutations.job.mark[1].loading
    || mutations.message.delete[1].loading || mutations.message.mark && mutations.message.mark[1].loading
    || mutations.position.delete[1].loading || mutations.position.mark && mutations.position.mark[1].loading
    || mutations.recruiter.delete[1].loading || mutations.recruiter.mark && mutations.recruiter.mark[1].loading
    || mutations.relation.delete[1].loading || mutations.relation.mark && mutations.relation.mark[1].loading
    || mutations.skill.delete[1].loading || mutations.skill.mark && mutations.skill.mark[1].loading
    || mutations.user.delete[1].loading || mutations.user.mark && mutations.user.mark[1].loading,
  [
    mutations.candidate,
    mutations.company,
    mutations.contact,
    mutations.industry,
    mutations.job,
    mutations.message,
    mutations.position,
    mutations.recruiter,
    mutations.relation,
    mutations.skill,
    mutations.user
  ])

  useEffect(() => {
    dispatch({ type: loading ? 'ADD_LOADING' : 'DELETE_LOADING', loading: 'DeletionGridToolbar' })
  }, [dispatch, loading])

  const detailClick = (): void => {
    const url = toolbar.selectedRows.values().next().value
    router.push(url)
  }

  const linksClick = async (): Promise<void> => {
    const keyObj = splitKey(toolbar.selectedRows.values().next().value)
    const url = `/list/links?detail=${keyObj.subfld[1]}&${keyObj.query}`
    router.push(url)
  }

  const markClick = async (): Promise<void> => {
    for (const row of toolbar.selectedRows.values()) {
      const keyObj = splitKey(row)
      const detail = keyObj.subfld[1]
      const mark = mutations[detail].mark

      if (mark) await mark[0]({ variables: detail === 'relation'
        ? { candidateId: parseInt(keyObj.params.candidate_id), recruiterId: parseInt(keyObj.params.recruiter_id) }
        : { id: parseInt(keyObj.params.id) }
      })
      console.log(`${detail} ${keyObj.params.id} is marked`)
    }
    dispatch({ type: 'SHOW_MODAL', body: '<h2>Objects have been marked</h2>' })
  }

  const markModal = (): void => {
    dispatch({
      type: 'SHOW_MODAL',
      body: '<h2>Selected objects will be marked for deletion</h2>',
      buttons: [
        { title: 'YES', next: markClick },
        { title: 'NO', default: true }
      ]
    })
  }

  const changeClick = async (): Promise<void> => {
    for (const row of toolbar.selectedRows.values()) {
      console.log(row)
    }
    dispatch({ type: 'SHOW_MODAL', body: '<h2>Objects have been changed</h2>' })
  }

  const changeModal = (): void => {
    dispatch({
      type: 'SHOW_MODAL',
      body: '<h2>Selected objects will be changed to the target</h2>',
      buttons: [
        { title: 'YES', next: changeClick },
        { title: 'NO', default: true }
      ]
    })
  }

  const deleteClick = async (): Promise<void> => {
    for (const row of toolbar.selectedRows.values()) {
      const keyObj = splitKey(row)
      const detail = keyObj.subfld[1]

      await mutations[detail].delete[0]({ variables: detail === 'relation'
        ? { candidateId: parseInt(keyObj.params.candidate_id), recruiterId: parseInt(keyObj.params.recruiter_id) }
        : { id: parseInt(keyObj.params.id) }
      })
      console.log(`${detail} ${keyObj.params.id} is deleted`)
    }
    dispatch({ type: 'SHOW_MODAL', body: '<h2>Objects have been deleted</h2>' })
  }

  const deleteModal = (): void => {
    dispatch({
      type: 'SHOW_MODAL',
      body: '<h2>Selected objects will be deleted</h2>',
      buttons: [
        { title: 'YES', next: deleteClick },
        { title: 'NO', default: true }
      ]
    })
  }

  return <div className="navbar-start">
    <div className="navbar-item">
      <button className="button" disabled={toolbar.selectedRows.size === 0} onClick={detailClick}>
        <span className="icon"><FontAwesomeIcon icon={faEdit} /></span>
        <span>Detail</span>
      </button>
    </div>
    {toolbar.buttons === 'deletion' && <div className="navbar-item">
      <button className="button" disabled={toolbar.selectedRows.size === 0} onClick={linksClick}>
        <span className="icon"><FontAwesomeIcon icon={faLink} /></span>
        <span>Links</span>
      </button>
    </div>}
    {toolbar.buttons === 'links' && <div className="navbar-item">
      <button className="button" disabled={toolbar.selectedRows.size === 0} onClick={markModal}>
        <span className="icon"><FontAwesomeIcon icon={faCheck} /></span>
        <span>Mark</span>
      </button>
    </div>}
    {toolbar.buttons === 'links' && <div className="navbar-item">
      <button className="button" disabled={toolbar.selectedRows.size === 0} onClick={changeModal}>
        <span className="icon"><FontAwesomeIcon icon={faRightLeft} /></span>
        <span>Change</span>
      </button>
    </div>}
    <div className="navbar-item">
      <button className="button is-warning" disabled={toolbar.selectedRows.size === 0} onClick={deleteModal}>
        <span className="icon"><FontAwesomeIcon icon={faXmark} /></span>
        <span>Delete</span>
      </button>
    </div>
  </div>
}

export default DeletionGridToolbar
