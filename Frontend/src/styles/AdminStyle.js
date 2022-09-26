import styled from "styled-components";

export const AdminMainGround = styled.div`
  background-color: ${(props) => props.theme.colors.silver};
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  //justify-content: space-between;

  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box; /* Opera/IE 8+ */
`;

export const FullwidthBox = styled.div`
    width : 100%;
    display: flex;
    height: 100px;
    margin-top: 50px;
    margin-left: 10px;
    margin-right: 10px;
`
export const ComponentBox = styled.div`
  flex: 1;
  display: flex;
  background-color: white;
  margin-left: 10px;
  margin-right: 20px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  
`
export const TextBox = styled.div`
  font-size : 20px;
  display: flex;
  flex-direction: column;
`

export const AdminMainImg = styled.img`
  height: 50px;
  text-align: center;
  padding: 15px;
`;

export const ArticleWrapper = styled.ul`
  width : 97%;
  display: flex;
  height: 200px;
  margin-top: 50px;
  margin-left: 20px;
  margin-right: 10px;
  padding: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  border-radius: 10px;
`
export const Article = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 20%;
  margin: 10px;
  //background-color: #9e9e9e;
`

export const IconBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`
export const CommentInputBox = styled.div`
  display: flex;
`
export const UploaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const ImgWrapper = styled.div`
  margin: 0px 0 20px 0;
`

export const MapLink = styled.a`
  position: relative;
  top : 5px;
  left : 5px;
  margin-right: 5px;
  border-radius: 30px;
  z-index: 200;
  background-color: #546e7a;
  color : white;
  cursor: pointer;
`


