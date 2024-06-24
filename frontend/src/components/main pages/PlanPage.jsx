import React from 'react'
import PlanPageLeft from '../LeftPage/PlanPageLeft';
import PlanPageRight from '../RightPage/PlanPageRight';

const PlanPage = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div> <div className='category_page'>
    <div className='category_page_left'>
      <PlanPageLeft open={open} setOpen={setOpen} />
    </div>
    <div className='category_page_right'>
      <PlanPageRight open={open} setOpen={setOpen}/>
    </div>
    </div></div>
  )
}

export default PlanPage