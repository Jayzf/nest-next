import Overlay from '@client/components/atoms/overlay/Overlay';
import { CLOSE_SCHEDULE_MODAL } from '@client/store/actions/actionTypes';
import { GlobalContext } from '@client/store/context';
import { ScheduleModalFormMode } from '@shared/enums/schedule';
import React, {
  ChangeEvent,
  FC,
  ReactElement,
  SyntheticEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import ScheduleModalCloseBtn from './ScheduleModalCloseBtn/ScheduleModalCloseBtn';

export interface ScheduleModalDataType {
  title: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
}

interface Props {
  formMode?: ScheduleModalFormMode;
  onCancel?: () => void;
  onSubmit?: (data: ScheduleModalDataType) => void;
  onClose?: () => void;
}

const ScheduleModal: FC<Props> = ({
  formMode = ScheduleModalFormMode.CREATE,
  onCancel,
  onSubmit,
  onClose,
}: Props): ReactElement => {
  const { globalState, dispatch } = useContext(GlobalContext);

  const titleInputRef = useRef(null);
  const title: string = getTitle(formMode);

  const [state, setState] = useState<ScheduleModalDataType>({
    title: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
  });

  useEffect(() => {
    titleInputRef.current?.focus();
  }, []);

  const handleTitleInput = (evt: ChangeEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      title: evt.target.value,
    });
  };

  const handleStartDateInput = (evt: ChangeEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      startDate: evt.target.value,
    });
  };

  const handleStartTimeInput = (evt: ChangeEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      startTime: evt.target.value,
    });
  };

  const handleEndDateInput = (evt: ChangeEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      endDate: evt.target.value,
    });
  };

  const handleEndTimeInput = (evt: ChangeEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      endTime: evt.target.value,
    });
  };

  const handleCancelBtnClick = (evt: SyntheticEvent): void => {
    evt.preventDefault();
    dispatch({ type: CLOSE_SCHEDULE_MODAL });

    onCancel?.();
  };

  const handleSubmitBtnClick = (evt: SyntheticEvent): void => {
    evt.preventDefault();
    onSubmit?.(Object.assign({}, state));
  };

  const handleCloseBtnClick = (evt: SyntheticEvent): void => {
    evt.preventDefault();
    dispatch({ type: CLOSE_SCHEDULE_MODAL });

    onClose?.();
  };

  return (
    <Wrap>
      <Overlay opacity={0.2} />
      <Modal>
        <Title>{title}</Title>

        <ScheduleForm action="" method="post">
          <fieldset>
            <FieldsetLegend>{title}</FieldsetLegend>

            <div>
              <TitleInputLabel htmlFor="schedule-title">
                일정 제목을 입력하세요
              </TitleInputLabel>
              <TitleInput
                ref={titleInputRef}
                id="schedule-title"
                type="text"
                name="title"
                autoComplete="off"
                value={state.title}
                onChange={handleTitleInput}
              />
            </div>

            <div>
              <div>
                <DateInputLabel htmlFor="schedule-start-date">
                  시작 날짜
                </DateInputLabel>
                <DateInput
                  id="schedule-start-date"
                  type="date"
                  name="start-date"
                  value={state.startDate}
                  onChange={handleStartDateInput}
                />
              </div>
              {/* 
              // TODO:
              <div>
                <TimeInputLabel htmlFor="schedule-start-time">
                  시작 시간
                </TimeInputLabel>
                <TimeInput
                  id="schedule-start-time"
                  type="time"
                  name="start-time"
                  value={state.startTime}
                  onChange={handleStartTimeInput}
                />
              </div>
               */}
            </div>

            <div>
              <div>
                <DateInputLabel htmlFor="schedule-end-date">
                  종료 날짜
                </DateInputLabel>
                <DateInput
                  id="schedule-end-date"
                  type="date"
                  name="end-date"
                  value={state.endDate}
                  onChange={handleEndDateInput}
                />
              </div>
              {/* 
              // TODO:
              <div>
                <TimeInputLabel htmlFor="schedule-end-time">
                  종료 날짜
                </TimeInputLabel>
                <TimeInput
                  id="schedule-end-time"
                  type="time"
                  name="end-time"
                  value={state.endTime}
                  onChange={handleEndTimeInput}
                />
              </div>
               */}
            </div>

            <BtnsWrap>
              <CancelBtn onClick={handleCancelBtnClick}>취소</CancelBtn>
              <SubmitBtn
                style={{
                  marginLeft: 12,
                }}
                type="submit"
                value="저장"
                onClick={handleSubmitBtnClick}
              />
            </BtnsWrap>
          </fieldset>
        </ScheduleForm>

        <ScheduleModalCloseBtn onClick={handleCloseBtnClick} />
      </Modal>
    </Wrap>
  );
};

export default ScheduleModal;

function getTitle(formMode: ScheduleModalFormMode): string {
  return `일정 ${
    formMode === ScheduleModalFormMode.CREATE ? '만들기' : '수정하기'
  }`;
}

const Wrap = styled.div<Props>`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Modal = styled.div`
  position: relative;
  width: 656px;
  height: 460px;
  padding: 48px;
  background: #ffffff;
  border-radius: 18px;
  box-shadow: 0px 20px 64px rgba(0, 0, 0, 0.31);
`;

const Title = styled.strong`
  display: block;
  font-family: 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 600;
  font-size: 28px;
  line-height: 34px;
  color: #000000;
`;

const ScheduleForm = styled.form`
  position: realtive;
  margin-top: 27px;
`;

const FieldsetLegend = styled.legend`
  display: block;
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  letter-spacing: 0.01em;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
`;

const TitleInputLabel = styled.label`
  display: block;
`;

const TitleInput = styled.input`
  display: block;
  width: 100%;
  height: 34px;
`;

// TODO: Define styles
const DateInputLabel = styled.label``;

const DateInput = styled.input``;

const TimeInputLabel = styled.label``;

const TimeInput = styled.input``;

const BtnsWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const CancelBtn = styled.button`
  display: block;
  width: 152px;
  height: 52px;
  background: #f3f3f3;
  border: 0;
  border-radius: 4px;
  color: #000;
  cursor: pointer;
`;

const SubmitBtn = styled.input`
  display: block;
  width: 152px;
  height: 52px;
  background: #000000;
  border: 0;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
`;
