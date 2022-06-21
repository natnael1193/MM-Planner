import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material"
import { useForm } from "react-hook-form"

const SpotContentForm = ({ formTitle, defaultValues, onFormSubmit }: any) => {

//React-Hook-Form
const { register, handleSubmit } = useForm({
    defaultValues
})

console.log(defaultValues)

    return (
        <div>
            <Box>
                <form onSubmit={handleSubmit(onFormSubmit)}>
                <Card sx={{ p: 4 }}>
                    <Typography variant="h3" sx={{ mb: 4 }}>{formTitle}</Typography>
                    <Grid container spacing={3}>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField fullWidth label="Name" {...register('name')} />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField fullWidth label="Content URL" {...register('contentUrl')}/>
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Button variant="contained" type="submit" color="primary" sx={{ ml: 2 }}>Submit</Button>
                        </Grid>
                    </Grid>
                </Card>
                </form>
            </Box>
        </div>
    )
}

export default SpotContentForm