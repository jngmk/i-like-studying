import React, { FunctionComponent } from 'react'
import uuid from 'uuid'

import Interface from './interfaces/CalendarRow.interface'
import { SubSchedule } from '../../../store/schedule'

import CalendarDay from './CalendarDay'

import '../styles/CalendarRow.scss'

const CalendarRow: FunctionComponent<Interface> = (props: Interface) => {
  const {
    calendarId,
    week,
    targetMonth,
    targetDateString,
    handleState,
    dayComponent,
    mainSchedule,
    subSchedule,
    daySchedule,
    colorPastDates,
    colorActiveDate,
    isAscending,
    onPage
  } = props

  const renderRows = (week: string[]) => {
    // 한 주에 출력해야할 소목표 개수
    let subScheduleLengthInWeek: number = 0
    let subScheduleOrder: Array<SubSchedule> = []
    let assignedNumber: Array<number> = []

    // 한 주의 소목표 공간 확보하기 위한 소목표 개수 최댓값
    week.map(day => {
      const weekSubSchedule = subSchedule
        .filter(schedule => schedule.startDate <= day && schedule.endDate >= day)
        .map(schedule => schedule.id)

      subScheduleLengthInWeek = Math.max(subScheduleLengthInWeek, weekSubSchedule.length)
      return day  // arrow function 은 return 값을 기대함
    })


    return week.map(day => {
      // 이번주 소목표들의 순서 결정(이번주 소목표들 중에 끝난 목표 제거 및 새로운 목표 추가)
      const weekSubSchedule = subSchedule
        .filter(schedule => (schedule.startDate <= day && schedule.endDate >= day)||schedule.startDate === '9999-99-99')

      // 기존에 추가되어 있는 일정 중에 끝난 일정이 있다면 값을 0으로 변경하여 나중에 스케줄 추가할 때 빈자리에 들어갈 수 있도록 조정
      const newSubScheduleOrder = subScheduleOrder.map(schedule => {
        if (schedule.id === 0) {
          return schedule
        }

        let isScheduleEnd: boolean = true
        for (let i = 0; i < weekSubSchedule.length; i++) {
          if (schedule.id === weekSubSchedule[i].id) {
            isScheduleEnd = false
            break
          }
        }
        if (isScheduleEnd) {
          const removeIdx = assignedNumber.indexOf(schedule.id)
          assignedNumber.splice(removeIdx, 1)
          const emptySchedule = {
            id: 0,
            calendarId: 0,
            subTitle: '',
            color: '',
            startDate: '',
            endDate: '',
          }
          return emptySchedule
        }
        return schedule
      })
      subScheduleOrder = newSubScheduleOrder

      // 새로운 소목표가 있는지 확인하고 추가
      weekSubSchedule.map(schedule => {
        if (subScheduleOrder.length === 0) {
          subScheduleOrder.push(schedule)
          assignedNumber.push(schedule.id)
        } else if (!assignedNumber.includes(schedule.id)) {
          // 빈자리 확인 후 추가
          let isAdd: boolean = false
          for (let i = 0; i < subScheduleOrder.length; i++) {
            if (subScheduleOrder[i].id === 0) {
              subScheduleOrder[i] = schedule
              assignedNumber.push(schedule.id)
              isAdd = true
              break
            }
          }
          if (!isAdd) {
            subScheduleOrder.push(schedule)
            assignedNumber.push(schedule.id)
          }
        }
        return schedule
      })

      // CalendarDay로 보내줄 소목표 정의
      let newSubSchedule: SubSchedule[] = []
      subScheduleOrder.map(scheduleOrder => {
        subSchedule.map(schedule => {
          if (scheduleOrder.id === schedule.id) {
            newSubSchedule.push(schedule)
          }
          return schedule
        })
        return scheduleOrder
      })

      return (
        <CalendarDay
          data-test="calendarDay"
          key={`day-${day || uuid()}`}
          calendarId={calendarId}
          date={day}
          targetMonth={targetMonth}
          targetDateString={targetDateString}
          handleState={handleState}
          dayComponent={dayComponent}
          mainSchedule={mainSchedule}
          subSchedule={newSubSchedule}
          subScheduleLength={subScheduleLengthInWeek}
          daySchedule={daySchedule}
          colorPastDates={colorPastDates}
          colorActiveDate={colorActiveDate}
          isAscending={isAscending}
          onPage={onPage}
        />
      )
    })
  }
  return (
    <div
      data-test="calendarRowContainer"
      className={`calendarRow`}
    >
      {renderRows(week)}
    </div>
  )
}

export default CalendarRow