import React, { PureComponent } from "react";
import EatenList from "../../components/List/EatenList";
import FavoriteIcon from "@material-ui/icons/Favorite";

import "../../assets/sass/ListPage/EatenPage.scss";

export default class EatenPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pet: this.props.pet,
      data: [
        {
          id: 1,
          name: "연어맛 훈제 사료",
          ingre: "생선, 해산물, 가공식품",
          tag: "#눈물 #피부 #모질 #영양",
          img: "/data/6.png",
        },
        {
          id: 2,
          name: "장어맛 훈제 사료",
          ingre: "생선, 해산물, 가공식품",
          tag: "#눈물 #피부 #모질 #영양",
          img: "/data/7.png",
        },
        {
          id: 3,
          name: "고등어맛 훈제 사료",
          ingre: "생선, 해산물, 가공식품",
          tag: "#눈물 #피부 #모질 #영양",
          img: "/data/8.png",
        },
        {
          id: 4,
          name: "참돔맛 훈제 사료",
          ingre: "생선, 해산물, 가공식품",
          tag: "#눈물 #피부 #모질 #영양",
          img: "/data/9.png",
        },
        {
          id: 5,
          name: "참돔맛 훈제 사료",
          ingre: "생선, 해산물, 가공식품",
          tag: "#눈물 #피부 #모질 #영양",
          img: "/data/10.png",
        },
        {
          id: 6,
          name: "참돔맛 훈제 사료",
          ingre: "생선, 해산물, 가공식품",
          tag: "#눈물 #피부 #모질 #영양",
          img: "/data/11.png",
        },
      ],
    };
  }

  render() {
    return (
      <div>
        <div className="text-box">
          <span className="eaten-title">먹은 음식 내역</span>
          <p />
          <span className="eaten-content">
            <b>{this.state.pet.name}가</b>
            <br />
            먹었던 음식이에요
            <FavoriteIcon color="secondary" />
          </span>
        </div>
        <div>
          <EatenList value={this.state.data}></EatenList>
        </div>
      </div>
    );
  }
}
