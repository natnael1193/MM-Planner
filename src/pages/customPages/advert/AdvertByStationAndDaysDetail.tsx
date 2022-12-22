import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import React from 'react';
import ProgramsByDays from 'src/components/customComponents/externalPrograms/ProgramsByDays';
import { useExternalProgramsByStationAndDaysQuery } from 'src/services/ExternalProgramApi';
import AdvertByStationAndDaysDetailComponent from '../../../components/customComponents/advertComponent/AdvertByStationAndDaysDetailComponent';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from '../shared/Loading';
import Pagination from 'src/components/customComponents/pagination/Pagination';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import Error from '../shared/Error';
import { useAddMultipleAdvertMutation } from 'src/services/AdvertApi';
import toast from 'react-hot-toast';
import moment from 'moment';

let PageSize = 20;

const AdvertByStationAndDaysDetail = () => {
  const navigate = useNavigate();
  const stationId = useParams();
  const [activeDate, setActiveDate] = React.useState('Monday');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [addAdvert, result] = useAddMultipleAdvertMutation();
  let orderedProgramsData: any = [];

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const {
    data: stationData,
    isLoading: stationLoading,
    error: stationError,
    refetch,
  } = useExternalProgramsByStationAndDaysQuery({
    stationId: stationId.stationId,
    day: activeDate,
    page: currentPage,
  });

  //Check the stauts
  const response: any = result;
  React.useEffect(() => {
    if (response.isSuccess) {
      toast.success('Advert Plan Generated Successfully');
      // navigate(`/dashboard/advert/advert-by-station/${stationId.stationId}`)
      reset();
      // setActiveDate('Monday');
    }
    if (response.isError) {
      toast.error('Error, Something went wrong!');
    }
  }, [response]);

  if (stationLoading) return <Loading />;
  if (stationError) return <Error />;

  orderedProgramsData = stationData?.data?.map((programs: any) => {
    return {
      id: programs.id,
      startTime: programs.startTime,
      endTime: programs.endTime,
      program: programs.program,
      key: programs.key,
      day: programs.day,
      time: moment
        .utc(programs.startTime)
        .format('HH')
        .concat(moment.utc(programs.startTime).format('mm')),
      priceConfig: programs.priceConfig,
    };
  });

  orderedProgramsData = orderedProgramsData.sort(
    (firstItem: any, secondItem: any) => firstItem.time - secondItem.time
  );

  const onSubmit = (data: any) => {
    console.log('data', data);
    let filteredData: any = [];
    filteredData = data?.ads?.filter((filtered: any) => {
      return filtered.isClicked === true;
    });
    filteredData = filteredData.map((filtered: any) => {
      return {
        day: activeDate.toLowerCase(),
        ModifiedCampainId: filtered.ModifiedCampainId,
        sponsoredLength: filtered.sponsoredLength,
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

  console.log('stationData', orderedProgramsData);

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
          {orderedProgramsData?.map((programs: any, index: any) => {
            return (
              <AdvertByStationAndDaysDetailComponent
                key={programs.id}
                programs={programs}
                index={index}
                stationId={stationId.stationId}
                {...{ register, errors, setValue, refetch }}
              />
            );
          })}
        </Grid>
        <Grid sx={{ ml: 4, mt: 2, mb: 2 }}>
          {/* <button onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
            <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button> */}
          {/* <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            // totalCount={posts.length}
            totalCount={200}
            pageSize={PageSize}
            onPageChange={(page: React.SetStateAction<number>) => {
              setCurrentPage(page);
            }}
          /> */}
        </Grid>
        <Grid sx={{ ml: 4, mt: 2, mb: 2 }}>
          <Button type="submit" variant="contained">
            {result.isLoading ? 'Loading...' : 'Submit'}
          </Button>
        </Grid>
      </form>
    </div>
  );
};

export default AdvertByStationAndDaysDetail;
