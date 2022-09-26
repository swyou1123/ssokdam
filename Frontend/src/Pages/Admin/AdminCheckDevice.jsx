import React from "react";
import Container from "@mui/material/Container";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { SERVER_URL } from "../../config";
import axios from "axios";
import { MapTypeId } from "react-kakao-maps-sdk";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Roadview, RoadviewMarker } from "react-kakao-maps-sdk";
import { useMap } from "react-kakao-maps-sdk";
import { RegisterBroken} from "../../api/admin";
import {ADMIN_SERVER_URL} from "../../config";
import {MapLink} from "../../styles/AdminStyle";
import EastIcon from '@mui/icons-material/East';

// import {
//   NaverMap,
//   RenderAfterNavermapsLoaded,
//   Marker,
//   Polyline,
// } from "react-naver-maps";

const columns = [
  {
    field: "id",
    headerName: "디바이스 번호",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "embCnt",
    headerName: "기기 사용횟수",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "embBat",
    headerName: "배터리 양(%)",
    type: "number",
    headerAlign: "center",
    flex: 1,
    align: "center",
  },
  {
    field: "embFullTra",
    headerName: "쓰레기통 양(%)",
    type: "number",
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "embFullCig",
    headerName: "꽁초 양(%)",
    type: "number",
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "embSta",
    headerName: "고장여부",
    flex : 1,
    align: "center",
    headerAlign: "center"
  }
];

export const AdminCheckDevice = () => {
  const [state, setState] = useState({
    center: {
      lat : 35.18380150,
      lng : 126.79374240,
    },
    errMsg: null,
    isLoading: true,
  });
  const [roadViewPosition, setRoadViewPosition] = useState(state.center);
  const [toggle, setToggle] = useState("map");
  const [mapTypeId, setMapTypeId] = useState();
  const [positions, setPositions] = useState([]);
  const [select, setSelection] = useState([])
  const [pathPosition, setPathPosition] = useState([])
  const [pathInfo, setPathInfo] = useState("")
  const rows = positions
  console.log(pathInfo)
  console.log(pathPosition)
  useEffect(() => {
    if(pathPosition.length > 6){
      pathPosition.pop()
    }
  }, [pathPosition]);


  useEffect(() => {
    const fetchDevice = async () => {
      const URL = `${ADMIN_SERVER_URL}/checkDevice`;
      // const URL = "http://localhost:8888/positions"
      let response = await fetch(URL, {
        method: "GET",
      }).then((res) => {
        res.json().then((res) => {
          console.log(res);
          for(let i=0; i < res.length; i++ ){
            res[i].id = res[i].embId
            delete res[i].embId
          }
          setPositions(res);
        });
      });
    };
    fetchDevice();
  }, []);
  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
              // lat : 35.18380150,
              // lng : 126.79374240,
            },
            isLoading: false,
          }));
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
          console.log(state);
        }
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }));
    }
  }, []);

  const registerBroken = () => {
    RegisterBroken(select)
        .then((res) => window.location.replace("/admin"))
  }



  const EventMarkerContainer = ({ position, content }) => {
    const map = useMap();
    const [isVisible, setIsVisible] = useState(false);

    return (
      <MapMarker
        position={position} // 마커를 표시할 위치
        // @ts-ignore
        onClick={(marker) => {
          map.panTo(marker.getPosition());
          console.log(position)
          setRoadViewPosition({
            lat: `${position.lat}`,
            lng: `${position.lng}`,
          });
          console.log({ id : `${position.id}`, lat : `${position.lat}`, lng :`${position.lng}` })
          setPathPosition(prevPathPosition => [...prevPathPosition, { id : `${position.id}`, lat : `${position.lat}`, lng :`${position.lng}` }])
        }}
        onMouseOver={() => setIsVisible(true)}
        onMouseOut={() => setIsVisible(false)}
        image={{
          src: "https://firebasestorage.googleapis.com/v0/b/ssokdam-e2b32.appspot.com/o/images%2Ftest%2F%EC%A7%80%EB%8F%84%EC%9E%84%ED%8B%B0.png?alt=media&token=901d2aff-752d-4d7d-84dd-7f960fa0b91d",
          size: {
            width: 24,
            height: 35,
          },
        }}
        // onClick={() => {setRoadViewPosition({
        //     "lat" : `${position.embLat}`, "lng" :`${position.embLng}`
        // })}}
      >
        {isVisible && content}
      </MapMarker>
    );
  };

  const MakePath = () => {
    let path =''
    let pathGoing = ``
    if(pathPosition.length === 1){
      let pathGoing = `${pathPosition[0].id}번 디바이스`
      setPathInfo(pathGoing)
      return  <a style={{ textDecoration : 'none', color : 'white' }} href={`https://map.naver.com/v5/directions/${state?.center.lng},${state?.center.lat},내위치/${pathPosition[0]?.lng},${pathPosition[0].lat},목적지/-/car?c=14121208.9388342,4181426.9377556,15,0,0,0,dh`}>길찾기</a>
    }else if(pathPosition.length === 0){
      setPathInfo(pathGoing)
      return <a style={{ textDecoration : 'none', color : 'white' }} onClick={() => alert("경로를 설정해주세요.")}>길찾기</a>
    }
    for(let i=0; i<pathPosition.length-1; i++){
      pathGoing += (`${pathPosition[i].id}번 디바이스 → `)
      path += `${pathPosition[i].lng},${pathPosition[i].lat},${pathPosition[i].id}번 디바이스:`
    }
    path = path.slice(0,-1)
    pathGoing += `${pathPosition.at(-1).id}번 디바이스`
    console.log(path)
    console.log(pathGoing)
    setPathInfo(pathGoing)
    return (
        <a style={{ textDecoration : 'none', color : 'white' }} href={`https://map.naver.com/v5/directions/${state?.center.lng},${state?.center.lat},내위치/${pathPosition[pathPosition.length-1]?.lng},${pathPosition[pathPosition.length-1].lat},목적지/${path}/car?c=14121208.9388342,4181426.9377556,15,0,0,0,dh`}>길찾기</a>
    )
  }


  return (
    <React.Fragment>
      <h3 style={{ marginLeft: "25px", marginBottom: "5px" }}>지도</h3>
      <Container sx={{ marginTop: "0px" }} maxWidth="xxl">
        <div style={{ width: "100%", height: "400px", position: "relative" }}>
          <Map // 지도를 표시할 Container
                    center={state.center}
                    style={{
                        // 지도의 크기
                        width: "100%",
                        height: "90%",
                        marginBottom : "20px",
                        zIndex : 0,
                        display: toggle === "map" ? "block" : "none",

                    }}
                    level={4} // 지도의 확대 레벨
                >
                    {(
                        <MapMarker position={state.center}>
                            <div style={{ padding: "5px", color: "#000" }}>
                                현재 위치입니다.
                            </div>
                        </MapMarker>
                    )}
                    {(positions.map((position,index) => (
                        <Box key={index}>
                          <MapMarker
                              // position={position.latlng}
                              position={{"lat" : `${position.embLat}`, "lng" :`${position.embLng}`}}
                              key={position.id}
                              image={{
                                  src: "https://firebasestorage.googleapis.com/v0/b/ssokdam-e2b32.appspot.com/o/images%2Ftest%2F%EC%A7%80%EB%8F%84%EC%9E%84%ED%8B%B0.png?alt=media&token=901d2aff-752d-4d7d-84dd-7f960fa0b91d", // 마커이미지의 주소입니다
                                  size: {
                                      width: 24,
                                      height: 35
                                  },
                              }}
                              title={`${position.id}번 디바이스`}
                              onClick={() => {
                                // setRoadViewPosition({"lat" : `${position.embLat}`, "lng" :`${position.embLng}`})
                              }}
                          />
                          <EventMarkerContainer
                              key={index}
                              position={{"id" : `${position.id}`, "lat" : `${position.embLat}`, "lng" :`${position.embLng}`}}
                              content={`${position.id}번 디바이스`}
                          />
                        </Box>
                      
                    )))}
                    {!!(state && toggle === "map") ? (
                      <Button variant="contained"><MakePath/></Button>
                    ) : (<></>) }
                    
                    {toggle === "map" && (
                        <Button
                            // sx={{
                            //     position: "relative",
                            //     top: "5px",
                            //     left: "5px",
                            //     zIndex: 30,
                            //     borderRadius : '30px',
                            //     backgroundColor : '#546e7a',
                            //     color : 'white',
                            //     cursor : 'pointer'
                            // }}
                            sx={{ ml : 1 }}
                            variant="contained"
                            type="button"
                            onClick={() => setToggle("roadview")}
                            title="로드뷰 보기"
                            value="로드뷰"
                        >로드뷰</Button>
                    )}
                    {mapTypeId && <MapTypeId type={mapTypeId}/>}
                </Map>
          <Roadview // 로드뷰를 표시할 Container
            position={{ ...roadViewPosition, radius: 50 }}
            style={{
              display: toggle === "roadview" ? "block" : "none",
              width: "100%",
              height: "90%",
              zIndex: 100,
            }}
          >
            <RoadviewMarker position={roadViewPosition} />
            {toggle === "roadview" && (
                <>
                <Button variant="contained" sx={{ mt : 1 }}><MakePath/></Button>
                <Button
                  variant="contained"
                  sx={{ mt : 1, ml : 1 }}
                  type="button"
                  onClick={() => setToggle("map")}
                  title="지도 보기"
                  value="지도"
                >지도</Button>
                </>
            )}
          </Roadview>
        </div>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <ButtonGroup
            sx={{ marginBottom: "20px" }}
            variant="outlined"
            color="info"
          >
            <Button
              onClick={() => {
                setMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
              }}
            >
              교통정보 보기
            </Button>
            <Button
              onClick={() => {
                setMapTypeId(kakao.maps.MapTypeId.ROADVIEW);
              }}
            >
              로드뷰 도로정보 보기
            </Button>
            <Button
              onClick={() => {
                setMapTypeId(kakao.maps.MapTypeId.TERRAIN);
              }}
            >
              지형정보 보기
            </Button>
            <Button
              onClick={() => {
                setMapTypeId(kakao.maps.MapTypeId.USE_DISTRICT);
              }}
            >
              지적편집도 보기
            </Button>
          </ButtonGroup>
        </Box>
        <h4>수거 경로 : { pathInfo }</h4>
        <h4 style={{ marginBottom : '0px' }} >로드뷰 : { pathPosition.length === 0 ? '' : `${pathPosition.at(-1).id}번 디바이스` }</h4>
        <Button variant="contained" sx={{ m : 1, ml : 0 }} color="error" onClick={() => {
          setPathPosition([])
          setPathInfo('')
        }}>경로 초기화</Button>
        <Button variant="contained" sx={{ m : 1, ml : 0 }} color="info" onClick={() => {
          pathPosition.splice(-1,1)
          console.log(pathPosition)
          setPathPosition([...pathPosition])
        }}>경로 한칸뒤로</Button>
      </Container>
      <Box
          sx={{
            height: 400,
            width: '99%',
            '& .warning': {
              backgroundColor: '#fff9c4',
              color: '#1a3e72',
            },
            '& .broken': {
              backgroundColor: '#ffcdd2',
              color: 'red',
            },
          }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onSelectionModelChange={(newSelection) => {
            setSelection(newSelection)
          }}
          getRowClassName={(params) =>{
          if(params.row.embSta === "Y"){
            return 'broken'
          }else if(params.row.embDumy === "bad"){
            return 'warning'
          }
        }}
        />
      </Box>
      <Box sx={{ display : 'flex', justifyContent : 'flex-end', px : 3 }}>
        <Button variant="contained" sx={{ m : 0.5 }} color="error" onClick={() => registerBroken()}>고장상태 변경</Button>
      </Box>
    </React.Fragment>
  );
};
