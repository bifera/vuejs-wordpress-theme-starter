import _ from "lodash";
import axios from "axios";
import SETTINGS from "../settings";

export default {
  getCategories(cb) {
    axios
      .get(
        SETTINGS.API_BASE_PATH +
          "categories?sort=name&hide_empty=true&per_page=50"
      )
      .then(response => {
        cb(response.data.filter(c => c.name !== "Uncategorized"));
      })
      .catch(e => {
        cb(e);
      });
  },

  getPages(cb) {
    axios
      .get(SETTINGS.API_BASE_PATH + "pages")
      .then(response => {
        cb(response.data);
      })
      .catch(e => {
        cb(e);
      });
  },

  getPage(id, cb) {
    if (_.isNull(id) || !_.isNumber(id)) return false;
    axios
      .get(SETTINGS.API_BASE_PATH + "pages/" + id)
      .then(response => {
        cb(response.data);
      })
      .catch(e => {
        cb(e);
      });
  },

  getCakes(cb) {
    axios
      .get(SETTINGS.API_BASE_PATH + "cakes?per_page=10")
      .then(response => {
        cb(response.data);
      })
      .catch(e => {
        cb(e);
      });
  },

  getCake(id, cb) {
    if (_.isNull(id) || !_.isNumber(id)) return false;
    axios
      .get(SETTINGS.API_BASE_PATH + "cakes/" + id)
      .then(response => {
        cb(response.data);
      })
      .catch(e => {
        cb(e);
      });
  },

  getPosts(limit, cb) {
    if (_.isEmpty(limit)) {
      let limit = 5;
    }

    axios
      .get(SETTINGS.API_BASE_PATH + "posts?per_page=" + limit)
      .then(response => {
        cb(response.data);
      })
      .catch(e => {
        cb(e);
      });
  },

  getMenuItems(cb) {
    axios
      .get(SETTINGS.API_BASE_PATH + "navigation/header_menu")
      .then(response => {
        cb(response.data);
      })
      .catch(e => {
        cb(e);
      });
  },

};
