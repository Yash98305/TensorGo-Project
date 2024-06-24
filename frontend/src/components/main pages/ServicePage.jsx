import React from 'react'
import ServicePageLeft from '../LeftPage/ServicePageLeft';
import ServicePageRight from '../RightPage/ServicePageRight';

const ServicePage = () => {
  const [open, setOpen] = React.useState(false);

  return (
  <>
     <div className='category_page'>
      <div className='category_page_left'>
        <ServicePageLeft open={open} setOpen={setOpen} />
      </div>
      <div className='category_page_right'>
        <ServicePageRight open={open} setOpen={setOpen}/>
      </div>
      </div>
  </>
  )
}

export default ServicePage