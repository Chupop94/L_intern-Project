import React, { useState, useRef } from "react";
import {
  makeStyles,
  IconButton,
  Grid,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  List,
  Box,
  ListItemSecondaryAction,
  Button,
} from "@material-ui/core";
import mobiscroll from "../../lib/mobiscroll/js/mobiscroll.react.min.js";
import "../../lib/mobiscroll/css/mobiscroll.react.min.css";

//css
import "../../assets/sass/Compare/First.scss";
import Headbar from "../../components/Toolbar/Headbar.js";

import ControlPointIcon from "@material-ui/icons/ControlPoint";
import ClearIcon from "@material-ui/icons/Clear";
//

const useStyle = makeStyles(theme => ({
  ButtonMiddle: {
    width: 200,
    height: 150,
    display: "flex",
  },
}));

const defaultProps = {
  bgcolor: "background.paper",
  borderColor: "text.primary",
  m: 1,
  border: 1,
  style: { width: "21rem", height: "10rem" },
};

export default function ComparePage() {
  const [index, setIndex] = useState(-1);
  const [isActive, setActive] = useState(false);
  const [topBlock, setBlock] = useState(false);
  const [compare, setCompare] = useState([]);
  const upPopup = useRef();
  const data = JSON.parse(window.sessionStorage.getItem(`checkedItem`));

  // 담기버튼이 나오면서 해당 list의 index 값을 넘김
  const showListClick = key => {
    setIndex(key);
    setActive(false);
    setBlock(true);
  };

  const hideListClick = () => {
    setBlock(false);
    setIndex(-1);
    setCompare([]);
  };

  // 선택한 List의 값이 나올 예정, 현재 index값만 나옴
  const handleShow = () => {
    setActive(true);
  };

  const handleCompareList = key => {
    var arr = [...compare];

    if (compare.includes(key)) {
      arr = arr.filter(idx => idx !== key);
    } else arr.push(key);

    setCompare(arr);
    upPopup.current.instance.show();
  };

  const routeToCompare = () => {
    window.sessionStorage.setItem(`standard`, JSON.stringify(data[index]));
    window.sessionStorage.setItem(`compare`, JSON.stringify(changeData()));
    window.location.href = "/CompareSecond";
  };

  const changeData = () => {
    var arr = [];
    compare.map(key => {
      arr.push(data[key]);
    });
    return arr;
  };

  return (
    <div className="first">
      <Headbar title="비교함" badge={false}></Headbar>

      {/* // 
        1. 선택을 하지 않았을때 비교하고싶은 사료 등록하고 
        2. 기준 사료를 선택을 하면 -> 기준사료 리스트가 box안으로
        3. 함께 비교할 사료를 선택
      // */}
      <div className={useStyle().ButtonMiddle}>
        {topBlock ? (
          <Box justifyContent="center">
            <Box className="boxchange" borderRadius={16} {...defaultProps}>
              <ListItemAvatar>
                <Avatar className="avatar" src={"/data/" + data[index].food_no + ".png"} alt="..." />
              </ListItemAvatar>
              <ListItemText
                primary={data[index].food_name}
                secondary={
                  <React.Fragment>
                    {data[index].food_category}
                    <br />
                    {data[index].food_tag}
                  </React.Fragment>
                }
              />
              <IconButton>
                <ClearIcon fontSize="small" className="clear" onClick={hideListClick} />
              </IconButton>
            </Box>
          </Box>
        ) : (
          <Box display="flex" justifyContent="center">
            <Box component="button" className="topbox" borderRadius={16} {...defaultProps} onClick={handleShow}>
              <ControlPointIcon />
              <h6>비교하고 싶은 사료를 등록하세요.</h6>
            </Box>
          </Box>
        )}
      </div>

      <div>
        <Grid>
          <Grid>
            <div>
              <List>
                {Object.keys(data)
                  .filter(key => key !== index)
                  .map(key => {
                    return (
                      <ListItem key={data[key].food_no}>
                        <ListItemAvatar>
                          <Avatar className="avatar" src={"/data/" + data[key].food_no + ".png"} alt="..." />
                        </ListItemAvatar>
                        <ListItemText
                          primary={data[key].food_name}
                          secondary={
                            <React.Fragment>
                              {data[key].food_category}
                              <br />
                              {data[key].food_tag}
                            </React.Fragment>
                          }
                        />
                        {isActive && (
                          <ListItemSecondaryAction className="items-start">
                            <button className="button-active" onClick={() => showListClick(key)}>
                              <span className="btn_txt">담기</span>
                            </button>
                          </ListItemSecondaryAction>
                        )}

                        {topBlock && (
                          <ListItemSecondaryAction className="items-start">
                            <button
                              className={compare.includes(Number.parseInt(key)) ? "button-disable" : "button-active"}
                              onClick={() => handleCompareList(Number.parseInt(key))}
                            >
                              <span className="btn_txt2">비교</span>
                              &nbsp;
                            </button>
                          </ListItemSecondaryAction>
                        )}
                      </ListItem>
                    );
                  })}
              </List>
              <mobiscroll.Popup ref={upPopup} display="bottom" buttons={[]}>
                <div className="mbsc-align-center">
                  <div className="mbsc-col text-center mbsc-col">
                    <button onClick={() => routeToCompare()}>비교하기</button>
                  </div>
                </div>
              </mobiscroll.Popup>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
