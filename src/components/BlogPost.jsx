import {
  Grid,
  Divider,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import CommentButton from '../pages/Comments/CommentButton'
import '../styles/reactMarkdown.css'
import { useNavigate } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { REQUEST } from '../data/requests.constants'
import { useEffect, useState } from 'react'
import RecommendButton from '../pages/Blog/components/RecommendButton'
import IconButton from '@mui/material/IconButton'
import MoreIcon from '@mui/icons-material/MoreHoriz'
import useCurrentId from '../hooks/useCurrentId'
import { useSelector } from 'react-redux'
import { PATH } from '../data/paths'

function BlogPost() {
  const userEmail = useSelector((state) => state.user.user)
  const navigate = useNavigate()
  const { currentId } = useCurrentId()

  const { data, fetchData } = useFetch(
    `posts/get/blog/${currentId}`,
    REQUEST.GET
  )
  const { fetchData: deleteBlog } = useFetch(
    `posts/delete/blog/${currentId}`,
    REQUEST.DELETE
  )

  const [responseData, setResponseData] = useState({})
  const [likes, setLikes] = useState(0)

  const [moreAnchorEl, setMoreAnchorEl] = useState(null)

  const handleMenuOpen = (event) => {
    setMoreAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setMoreAnchorEl(null)
  }

  const isMenuOpen = Boolean(moreAnchorEl)

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    console.log(responseData)
  }, [responseData])

  useEffect(() => {
    if (data !== null) {
      setLikes(data.likes)
      setResponseData(data)
    }
  }, [data])

  const handleClickEdit = () => {
    navigate(`/edit/${currentId}`)
  }

  const handleClickDelete = () => {
    deleteBlog()
    navigate(PATH.HOME)
  }

  const renderMenu = (
    <Menu
      anchorEl={moreAnchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleClickEdit}>
        <Typography variant="body2">Edit</Typography>
      </MenuItem>
      <MenuItem onClick={handleClickDelete}>
        <Typography variant="body2">Delete</Typography>
      </MenuItem>
    </Menu>
  )

  return (
    <Grid
      item
      xs={12}
      md={6}
      py={1}
      width={'800px'}
      maxWidth={'800px'}
      minWidth={'100px'}
    >
      {responseData && (
        <>
          <Grid
            sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}
          ></Grid>
          <h1 style={{ fontSize: '42px' }}>{responseData.title}</h1>
          {responseData.user && (
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Box display={'flex'} alignItems={'center'}>
                <Avatar>
                  {responseData.user.firstname[0]}
                  {responseData.user.lastname[0]}
                </Avatar>
                <Box sx={{ marginY: '20px', marginLeft: '10px' }}>
                  <p
                    style={{ fontSize: '16px' }}
                  >{`${responseData.user.firstname} ${responseData.user.lastname}`}</p>
                  <p style={{ fontSize: '14px', color: 'grey' }}>
                    {responseData.createdAt}
                  </p>
                </Box>
              </Box>

              {userEmail === responseData.user.email && (
                <Box>
                  <IconButton
                    size="large"
                    aria-label="show more"
                    aria-haspopup="true"
                    onClick={handleMenuOpen}
                    color="inherit"
                  >
                    <MoreIcon />
                  </IconButton>
                </Box>
              )}
            </Box>
          )}
          <Divider />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Box marginY={'1px'} display={'flex'}>
              <RecommendButton likes={likes} />
              <CommentButton />
            </Box>
          </Box>
          <Divider />
          <Box marginTop={'20px'}>
            <ReactMarkdown
              className="blog-line-break"
              rehypePlugins={[rehypeRaw]}
            >
              {responseData.content}
            </ReactMarkdown>
          </Box>
        </>
      )}
      {renderMenu}
    </Grid>
  )
}

export default BlogPost
