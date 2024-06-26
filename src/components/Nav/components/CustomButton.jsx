import React from 'react'
import { Button } from '@mui/material'
import PropTypes from 'prop-types'
import SignUpFormDialog from '../../../pages/SignUp/components/SignUpFormDialog'

const CustomButton = ({ buttonName }) => {
  return (
    <React.Fragment>
      <Button
        variant="contained"
        size="small"
        sx={{
          marginLeft: '10px',
          backgroundColor: '#fff',
          color: '#000',
          paddingX: '18px',
          borderRadius: '50px',
          '&:hover': {
            backgroundColor: '#e0e0e0',
          },
        }}
      >
        {buttonName}
      </Button>
      <SignUpFormDialog />
    </React.Fragment>
  )
}

export default CustomButton

CustomButton.propTypes = {
  buttonName: PropTypes.string.isRequired,
}
