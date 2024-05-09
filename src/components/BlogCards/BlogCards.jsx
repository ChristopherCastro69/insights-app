import PropTypes from 'prop-types'
import { Box, Pagination } from '@mui/material'
import CardPost from '../CardPost'
import CreateBlogButton from './components/CreateBlogButton'
import useFetch from '../../hooks/useFetch'
import { REQUEST } from '../../data/requests.constants'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const BlogCards = (props) => {
  const { url, isNewPostBtn } = props
  const [pageNumber, setPageNumber] = useState(1)
  const [search, setSearch] = useState('')
  const [params, setParams] = useState({})
  const [responseData, setResponseData] = useState({})

  const newSearch = useSelector((state) => state.search.query)

  const { data, fetchData } = useFetch(url, REQUEST.GET, params)

  useEffect(() => {
    fetchData()
  }, [params])

  useEffect(() => {
    setParams({ page: pageNumber - 1, query: search })
  }, [pageNumber, search])

  useEffect(() => {
    setSearch(newSearch)
  }, [newSearch])

  useEffect(() => {
    if (data === null) {
      return
    }
    setResponseData(data)
    console.log(data)
  }, [data])

  const handlePageChange = (event, newPage) => {
    console.log(pageNumber)
    setPageNumber(newPage)
  }
  return (
    <>
      {isNewPostBtn && <CreateBlogButton />}
      {responseData.content &&
        responseData.content.map((post) => (
          <CardPost key={post.title} post={post} />
        ))}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {responseData.content && (
          <Pagination
            page={pageNumber}
            count={responseData.totalPages}
            shape="rounded"
            size="large"
            onChange={handlePageChange}
          />
        )}
      </Box>
    </>
  )
}

BlogCards.propTypes = {
  url: PropTypes.string.isRequired,
  isNewPostBtn: PropTypes.bool.isRequired,
}

export default BlogCards