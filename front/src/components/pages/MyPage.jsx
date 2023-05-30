import MainPageMenu from "./MainPageMenu";
import ReservationInfo from "./ReservationInfo";
import user from "../../assets/user.png";
import sejongLogo from "../../assets/sejongLogo.png";
import search from "../../assets/search-interface-symbol.png";
import moment from "moment";
import calendar from "../../assets/calendar.png";
import visibility from "../../assets/visibility.png";
import logout from "../../assets/logout.png";
import styled from "styled-components";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useSearchParams, Link } from "react-router-dom";
import { useState } from "react";

export default function MyPage() {
<<<<<<< HEAD
    const [serchParams, setSearchParams] = useSearchParams();
    const [loginId, setLoginId] = useState("");
    const [reserveList, setReserveList] = useState([]);
    const dayList = ["일", "월", "화", "수", "목", "금", "토"];
    const navigate = useNavigate();

    // login이 되어있는지 확인해서 로그인이 되어 있으면 /myPage로 라우팅.
    useEffect(() => {
        // 서버로부터 로그인 여부 확인
        axios.get('/auth/checkLogin')
            .then((res) => {
                console.log(res);
                setLoginId((id) => res.data);
                // console.log("로그인 되어있습니다")
            })
            .catch((err) => {
                navigate('/loginPage')
            })
    }, []);

    useEffect(() => {
        axios.get('/reserve/user-list')
            .then((res) => {
                console.log(res.data);
                const info = makeReserveList(res.data);

                // 같은 날일때는 시간이 앞선 것부터.
                info.sort((a, b) => b.startHour - a.startHour);
                // 그 다음에 날짜를 기준으로 정렬
                info.sort((a, b) => b.date - a.date);
                // 월별 기준으로 정렬
                info.sort((a, b) => b.month - a.month);

                // 상태 반영
                setReserveList((state) => [...info]);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    const makeReserveList = (data) => {
        const infoData = [];
        for (let el of data) {
            const startTmp = el.start.split('T'); // 2023-04-20     05:00:00
            const endTmp = el.end.split('T'); // 2023-04-20     05:00:00
            
            const startCal = startTmp[0].split('-');
            const startTime = startTmp[1].split(':');
            const endTime = endTmp[1].split(':');
            const isExpire = new Date(el.start) < new Date(); // 만료된 예약인지 확인.
            // console.log(isExpire);

            const info = {
                reservationId: el.reservation_id,
                year: startCal[0],
                month: startCal[1],
                date: startCal[2],
                day: dayList[new Date(startCal[0], startCal[1]-1, startCal[2]).getDay()],
                startHour: startTime[0],
                startMinute: startTime[1],
                endHour: endTime[0],
                endMinute: endTime[1],
                room_id: el.room_id,
                isExpire: isExpire,
                buildingName: el.room_building_name,
                roomName: el.room_name,

            }
            infoData.push(info);
            // console.log(info);
        }
        return infoData;
=======
  const [serchParams, setSearchParams] = useSearchParams();
  const [loginId, setLoginId] = useState("");
  const [reserveList, setReserveList] = useState([]);
  const dayList = ["일", "월", "화", "수", "목", "금", "토"];
  const navigate = useNavigate();

  // login이 되어있는지 확인해서 로그인이 되어 있으면 /myPage로 라우팅.
  useEffect(() => {
    // 서버로부터 로그인 여부 확인
    axios
      .get("auth/checkLogin")
      .then((res) => {
        console.log(res);
        setLoginId((id) => res.data);
        // console.log("로그인 되어있습니다")
      })
      .catch((err) => {
        navigate("/loginPage");
      });
  }, []);

  useEffect(() => {
    axios
      .get("reserve/user-list")
      .then((res) => {
        console.log(res.data);
        const info = makeReserveList(res.data);

        // 같은 날일때는 시간이 앞선 것부터.
        info.sort((a, b) => b.startHour - a.startHour);
        // 그 다음에 날짜를 기준으로 정렬
        info.sort((a, b) => b.date - a.date);
        // 월별 기준으로 정렬
        info.sort((a, b) => b.month - a.month);

        // 상태 반영
        setReserveList((state) => [...info]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const makeReserveList = (data) => {
    const infoData = [];
    for (let el of data) {
      const startTmp = el.start.split("T"); // 2023-04-20     05:00:00
      const endTmp = el.end.split("T"); // 2023-04-20     05:00:00

      const startCal = startTmp[0].split("-");
      const startTime = startTmp[1].split(":");
      const endTime = endTmp[1].split(":");
      const isExpire = new Date(el.start) < new Date(); // 만료된 예약인지 확인.
      // console.log(isExpire);

      const info = {
        reservationId: el.reservation_id,
        year: startCal[0],
        month: startCal[1],
        date: startCal[2],
        day: dayList[
          new Date(startCal[0], startCal[1] - 1, startCal[2]).getDay()
        ],
        startHour: startTime[0],
        startMinute: startTime[1],
        endHour: endTime[0],
        endMinute: endTime[1],
        room_id: el.room_id,
        isExpire: isExpire,
        buildingName: el.room_building_name,
        roomName: el.room_name,
      };
      infoData.push(info);
      // console.log(info);
>>>>>>> dev
    }
    return infoData;
  };

  const todayList = () => {
    let message = "오늘의 예약이 없습니다";
    for (let el of reserveList) {
      // console.log(el);
      const year = parseInt(el.year);
      const month = parseInt(el.month) - 1;
      const date = parseInt(el.date);
      // console.log(moment(new Date(year, month, date)).format("YYYY-MM-DD"), moment(new Date()).format("YYYY-MM-DD"));
      if (
        moment(new Date(year, month, date)).format("YYYY-MM-DD") ===
          moment(new Date()).format("YYYY-MM-DD") &&
        !el.isExpire
      ) {
        message = `[${el.buildingName} ${el.roomName}] ${el.startHour}시${el.startMinute}분 ~ ${el.endHour}시${el.endMinute}분 오늘 예약이 있어요`;
      }
    }
    return message;
  };

  const recentList = () => {
    let message = "최근 예약내역이 없습니다.";
    for (let el of reserveList) {
      if (el.isExpire) {
        return `[${el.buildingName} ${el.roomName}] ${el.year}년 ${el.month}월 ${el.date}일 ${el.day}요일 ${el.startHour}시${el.startMinute}분 ~ ${el.endHour}시${el.endMinute}분`;
      }
    }
    return message;
  };

  const recentListPropsFunction = () => {
    let message = "최근 예약내역이 없습니다.";
    for (let el of reserveList) {
      console.log(el);
      if (el.isExpire) {
        const recentData = {
          year: el.year,
          month: el.month,
          date: el.date,
          room_id: el.room_id,
          day: el.day,
          startHour: el.startHour,
          startMinute: el.startMinute,
          endHour: el.endHour,
          endMinute: el.endMinute,
        };
        return recentData;
      }
    }
    return {};
  };

  return (
    <MainPageContainer>
      <ProfileDiv>
        <UserIcon src={sejongLogo} alt="" />
        <IntroBox>
          <Intro>{loginId}님</Intro>
          <div>
            {/* <LinkTag to="/ChangePasswordPage"><EditIcon src={edit} alt="" /></LinkTag> */}
            <LinkTag to="/changepasswordpage">
              <ChangePasswordBtn>비밀번호 수정하기</ChangePasswordBtn>
            </LinkTag>
          </div>
        </IntroBox>
      </ProfileDiv>
      <MenuContainer>
        {reserveList[0] ? (
          <ReservationInfo subTitle={"오늘의 예약"} info={todayList()} />
        ) : (
          <ReservationInfo
            subTitle={"오늘의 예약"}
            info="오늘은 예약이 없어요."
          />
        )}
        {reserveList[0] ? (
          <ReservationInfo
            subTitle={"가장 최근 이용 내역"}
            recentData={recentListPropsFunction()}
            info={recentList()}
          />
        ) : (
          <ReservationInfo
            subTitle={"가장 최근 이용 내역"}
            info="최근 예약 내역이 없어요."
          />
        )}
        {/* <ReservationInfo subTitle={"가장 최근 이용 내역"} info={"2023년 1월 12일 월요일 15:00 ~ 16:00"}/> */}
        <MainPageMenu
          icon={calendar}
          title={"예약하기"}
          where={"/selectmeetingroom"}
        />
        <MainPageMenu
          icon={search}
          title={"예약내역 확인하기"}
          where={"/show"}
        />
        <MainPageMenu
          icon={visibility}
          title={"회의실 둘러보기"}
          where={"/roomlistpage"}
        />
        <MainPageMenu icon={logout} title={"로그아웃"} where={"/logout"} />
      </MenuContainer>
    </MainPageContainer>
  );
}

const MainPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  // justify-content: flex-start;
  height: 100vh;
`;
const LinkTag = styled(Link)`
  width: 10%;
  text-align: right;
`;

const IntroBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const ChangePasswordBtn = styled.button`
  background-color: transparent;
  padding: 3px;

  font-size: 10px;
  font-weight: bold;
  color: black;

  border: 1px solid black;
  border-radius: 3px;
`;

const ProfileDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;

  height: 40%;
  // background-color: gray;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  // background-color: gray;
  flex: 1;

  @media screen and (min-height: 1000px) {
    justify-content: flex-start;
    flex: 0.5;
    // background-color: gray;
  }
`;

const Intro = styled.h2`
  // font-weight: bold;
  // font-size: 1.5em;
  display: flex;
  justify-content: center;
  // background-color: gray;
`;

const UserIcon = styled.img`
  width: 100px;
  max-width: 200px;
  margin-right: 10px;
`;

const EditIcon = styled.img`
  width: 100%;
  max-width: 30px;
`;
