import { Typography } from '@mui/material'
import React from 'react'
import AdvertByStationAndDaysComponent from 'src/components/customComponents/advertComponent/AdvertByStationAndDaysComponent'

const AdvertByStationAndDays = () => {
  return (
    <div>
      <Typography variant='h3' sx={{ mb: 2}}>Select Station</Typography>
      <AdvertByStationAndDaysComponent />
    </div>
  )
}

export default AdvertByStationAndDays