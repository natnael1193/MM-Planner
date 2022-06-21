import SpotContentForm
    from '../../../components/customComponents/spotContentComponent/SpotContentForm';

const EditSpotContent = () => {

  //Default Values Of Spot
  const defaultValues = { 
    "name": "Spot Content Name",
    "contentUrl": "www.spotContentUrl.com"
  }

  const onSubmit = ( data: any ) => {
    console.log(data);
  }

  return (
    <div><SpotContentForm formTitle={"Edit Spot Content"} defaultValues={defaultValues} onFormSubmit={onSubmit}/></div>
  )
}

export default EditSpotContent