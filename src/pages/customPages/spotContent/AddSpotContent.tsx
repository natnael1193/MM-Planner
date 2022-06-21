import SpotContentForm
  from '../../../components/customComponents/spotContentComponent/SpotContentForm';

const AddSpotContent = () => {
  
  //Initial Values Of Spot Content
  const InitialValues = { 
    "name" : '',
    "contentUrl" : ''
  }

  const onSubmit = ( data: any ) => {
    console.log(data)
  }

  return (
    <div>
      <SpotContentForm formTitle={'Add Spot Content'} defaultValues={InitialValues} onFormSubmit={onSubmit}/>
    </div>
  )
}

export default AddSpotContent