import React from 'react'
import { enableRipple } from '@syncfusion/ej2-base';
import {
  TimelineViews,
  TimelineMonth,
  Day,
  Week,
  WorkWeek,
  Month,
  Print,
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  ResourcesDirective,
  ResourceDirective,
  Inject,
  Resize,
  DragAndDrop,
  Agenda,
  ExcelExport,
  // PopupOpenEventArgs,
} from '@syncfusion/ej2-react-schedule';
import moment from 'moment';

const TimelineComponent = ( { advertData, advertPlanData }: any) => {

    console.log(advertData)
    console.log(advertPlanData)
    enableRipple(true);
  
    const newAdvertData =
      advertData &&
      advertData.map(function (advert: any) {
        return {
          Subject: advert.key,
          StartTime: moment.utc(advert.startTime).format().replace(/Z/g, ''),
          EndTime: moment.utc(advert.endTime).format().replace(/Z/g, ''),
          Id: advert.id,
          // TaskId: advert.program.id,
          TaskId: advert.programId,
          ProjectId: advert.ProjectId,
          // IsAllDay: advert.IsAllDay,
          IsReadonly: true,
        };
      });
  
    const newAdvertPlanData =
      advertPlanData &&
      advertPlanData.map(function (advertPlan: any) {
        return {
          id: advertPlan.id,
          programName: advertPlan.name,
          Id: advertPlan.id,
          IsReadonly: true,
        };
      });
  
      console.log(newAdvertPlanData)
  
    return (
      <div>
        <ScheduleComponent
          cssClass="timeline-resource-grouping"
          height="700px"
          selectedDate={new Date()}
          eventSettings={{ dataSource: newAdvertData }}
          firstDayOfWeek={4}
          group={{
            byDate: false,
            resources: ['Stations', 'Categories'],
            // enableCompactView: false
          }}
          popupOpen={(args: any) => {
            // args.cancel = true;
            // let isEmptyCell =  args.target.classList.contains('e-work-cells') || args.target.classList.contains('e-header-cells'); // checking whether the cell is empty or not
            // if ((args.type === 'QuickInfo' || args.type === 'Editor') ) {
            //   args.cancel = true;
            // }
            let isEmptyCell =
              args.target.classList.contains('e-work-cells') ||
              args.target.classList.contains('e-header-cells'); // checking whether the cell is empty or not
            if ((args.type === 'QuickInfo' || args.type === 'Editor') && isEmptyCell) {
              args.cancel = true;
            }
          }}
          //    currentView="TimelineDay"
        >
          <ViewsDirective>
            <ViewDirective option="Day" />
            <ViewDirective option="TimelineDay" />
            <ViewDirective option="TimelineWeek" />
            {/* <ViewDirective option='TimelineWorkWeek'/> */}
            <ViewDirective option="Month" />
            <ViewDirective option="TimelineMonth" />
            <ViewDirective option="Agenda" />
            {/* <ViewDirective option='Print' /> */}
          </ViewsDirective>
  
          <ResourcesDirective>
            <ResourceDirective
              field="TaskId"
              title="Category"
              name="Categories"
              allowMultiple={true}
              dataSource={newAdvertPlanData}
              textField="programName"
              idField="id"
              groupIDField="groupId"
              colorField="color"
            />
          </ResourcesDirective>
          <Inject
            services={[
              Day,
              Week,
              WorkWeek,
              Month,
              TimelineViews,
              TimelineMonth,
              DragAndDrop,
              Resize,
              Print,
              Agenda,
              ExcelExport,
            ]}
          />
        </ScheduleComponent>
      </div>
    );
        }
        
export default TimelineComponent;