import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";

@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "profile.html"
})
export class ProfilePage {
  // storeId: number;
  responseData: any;

  following = false;
  req = {
    sid: 0,
    token: ""
  };
  store = {
    sid: 0,
    name: "Paula Bolliger",
    profileImage: "assets/imgs/avatar.png",
    coverImage: "assets/imgs/background-1.jpg",
    type: "Designer",
    location: "Seattle, WA",
    joined: "",
    description:
      "A wise man once said: The more you do something, the better you will become at it.",
    followers: 456,
    following: 1052,
    posts: 35
  };

  posts = [
    {
      postImageUrl: "assets/img/background/background-2.jpg",
      text: `I believe in being strong when everything seems to be going wrong.
             I believe that happy girls are the prettiest girls.
             I believe that tomorrow is another day and I believe in miracles.`,
      date: "November 5, 2016",
      likes: 12,
      comments: 4,
      timestamp: "11h ago"
    },
    {
      postImageUrl: "assets/img/background/background-3.jpg",
      text:
        "Do not go where the path may lead, go instead where there is no path and leave a trail.",
      date: "October 23, 2016",
      likes: 30,
      comments: 64,
      timestamp: "30d ago"
    },
    {
      postImageUrl: "assets/img/background/background-4.jpg",
      date: "June 28, 2016",
      likes: 46,
      text: `Hope is the thing with feathers that perches in the soul
             and sings the tune without the words And never stops at all.`,
      comments: 66,
      timestamp: "4mo ago"
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider) {
    // debugger;
    this.req.sid = navParams.get("storeId");
    this.req.token = navParams.get("token");
    console.log("In profile, "+ JSON.stringify(this.req));
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ProfilePage");
    this.getVendorProfile(this.req);
  }

  getVendorProfile(req) {
    console.log("In profile, "+ JSON.stringify(req));
    this.authService.getVendorProfile(req).then(
      result => {
        this.responseData = result;
        if (this.responseData.status) {
          console.log(this.responseData);
          var $data = JSON.parse(JSON.stringify(this.responseData.body[0]))
          this.store.name = $data.storeName;
          this.store.location = $data.place;
          this.store.type = $data.storeType;
          var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
          this.store.joined = new Date($data.joinedon).toDateString();
          // .toLocaleDateString("en-US",options);
          console.log(this.store);
        } else {
          console.log("Profile not exists.");
        }
      },
      err => {
        // Error log
      }
    );
  }

  follow() {
    this.following = !this.following;
    // this.toastCtrl.create("Follow user clicked");
  }

  imageTapped(post) {
    // this.toastCtrl.create("Post image clicked");
  }

  comment(post) {
    // this.toastCtrl.create("Comments clicked");
  }

  like(post) {
    // this.toastCtrl.create("Like clicked");
  }
}
