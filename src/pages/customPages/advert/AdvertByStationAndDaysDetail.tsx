import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import React from 'react';
import ProgramsByDays from 'src/components/customComponents/externalPrograms/ProgramsByDays';
import { useExternalProgramsByStationAndDaysQuery } from 'src/services/ExternalProgramApi';
import AdvertByStationAndDaysDetailComponent from '../../../components/customComponents/advertComponent/AdvertByStationAndDaysDetailComponent';
import { useParams } from 'react-router-dom';
import Loading from '../shared/Loading';
import Pagination from 'src/components/customComponents/pagination/Pagination';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import Error from '../shared/Error';
import { useAddMultipleAdvertMutation } from 'src/services/AdvertApi';

let PageSize = 20;

const AdvertByStationAndDaysDetail = () => {
  const stationId = useParams();
  const [activeDate, setActiveDate] = React.useState('Monday');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [addAdvert, result] = useAddMultipleAdvertMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const {
    data: stationData,
    isLoading: stationLoading,
    error: stationError,
  } = useExternalProgramsByStationAndDaysQuery({
    stationId: stationId.stationId,
    day: activeDate,
    page: currentPage,
  });

  if (stationLoading) return <Loading />;
  if (stationError) return <Error />;

  const onSubmit = (data: any) => {
    console.log('data', data);
    let filteredData: any = [];
    filteredData = data?.ads?.filter((filtered: any) => {
      return filtered.isClicked === true;
    });
    filteredData = filteredData.map((filtered: any) => {
      return {
        day: activeDate,
        ModifiedCampainId: filtered.ModifiedCampainId,
        priceCategoryId: filtered.priceCategoryId,
        priceConfigId: filtered.priceConfigId,
        scheduleId: filtered.scheduleId,
        adverts: filtered?.adverts?.filter((ads: any) => {
          return ads.adsId !== '' && ads.adsId !== false && ads.qut !== '';
        }),
        // ads: filtered?.ads
      };
    });
    console.log('filteredData', filteredData);
    addAdvert({ ads: filteredData });
  };

  return (
    <div>
      <Typography variant="h3">{stationData?.data[0]?.program?.station?.name}</Typography>
      <ProgramsByDays
        setActiveDate={setActiveDate}
        activeDate={activeDate}
        setIsCheck={[]}
        setCurrentPage={setCurrentPage}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container sx={{ mt: 5 }} spacing={3}>
          {stationData?.data?.map((programs: any, index: any) => {
            return (
              <AdvertByStationAndDaysDetailComponent
                key={programs.id}
                programs={programs}
                index={index}
                stationId={stationId.stationId}
                {...{ register, errors, setValue }}
              />
            );
          })}
        </Grid>
        <Grid sx={{ ml: 4, mt: 2, mb: 2 }}>
          {/* <button onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
            <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button> */}
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            // totalCount={posts.length}
            totalCount={200}
            pageSize={PageSize}
            onPageChange={(page: React.SetStateAction<number>) => {
              setCurrentPage(page);
            }}
          />
        </Grid>
        <Grid sx={{ ml: 4, mt: 2, mb: 2 }}>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Grid>
      </form>
    </div>
  );
};

export default AdvertByStationAndDaysDetail;
