<template >
  <div>
    <div class="card card--reset">
  <a href="javascript:location.reload(true)">Refresh Page</a>
</div>

<div class="card">
  <table>
    <thead>
      <tr>
        <th class="table__date">Date</th>
        <th class="table__descrip">Description</th>
        <th class="table__amount">Amount</th>
        <th class="table__other"></th>
      </tr>
    </thead>
    <tbody>
      <tr class="js-table-row-load-1 hide">
        <td>12/12/17</td>
        <td>Bought a tv from Target the other night</td>
        <td>-$80.32</td>
        <td><a href=""><i class="table__icon medium material-icons">delete</i></a></td>
      </tr>
      <tr class="js-table-row-load-1 hide">
        <td>12/10/17</td>
        <td>Wendy's</td>
        <td>-$320.44</td>
        <td><a href=""><i class="table__icon medium material-icons">delete</i></a></td>
      </tr>
      <tr class="js-table-row-load-1 hide">
        <td>12/04/17</td>
        <td>Pizza Hut Food</td>
        <td>-$520.94</td>
        <td><a href=""><i class="table__icon medium material-icons">delete</i></a></td>
      </tr>
      <tr class="js-table-row-load-1 hide">
        <td>12/01/17</td>
        <td>Some Transaction that I made</td>
        <td>-$60.17</td>
        <td><a href=""><i class="table__icon medium material-icons">delete</i></a></td>
      </tr>
      <tr class="js-table-row-load-2 hide">
        <td>11/21/17</td>
        <td>Date Night with the guys</td>
        <td>-$80.44</td>
        <td><a href=""><i class="table__icon medium material-icons">delete</i></a></td>
      </tr>
      <tr class="js-table-row-load-2 hide">
        <td>11/19/17</td>
        <td>Ebay Transactions for sold product</td>
        <td>$1,220.78</td>
        <td><a href=""><i class="table__icon medium material-icons">delete</i></a></td>
      </tr>
      <tr class="js-table-row-load-2 hide">
        <td>11/15/17</td>
        <td>Bought some cool stuff</td>
        <td>$20.41</td>
        <td><a href=""><i class="table__icon medium material-icons">delete</i></a></td>
      </tr>
      <tr class="js-table-row-load-2 hide">
        <td>11/10/17</td>
        <td>Apple Bee Transactions</td>
        <td>$128.23</td>
        <td><a href=""><i class="table__icon medium material-icons">delete</i></a></td>
      </tr>

      <tr class="js-table-row-loader">
        <td colspan="4" class="table-cell-loader">
          <div class="row-loader u-flex">
            <div class="u-flex__cell u-mg--sm u-pd--sm loading-animation"></div>
            <div class="u-flex__cell u-mg--sm u-pd--sm loading-animation u-hide-small--flex"></div>
            <div class="u-flex__cell u-mg--sm u-pd--sm loading-animation u-show-large-only--flex"></div>
          </div>
          <hr>
          <div class="row-loader u-flex">
            <div class="u-flex__cell u-mg--sm u-pd--sm loading-animation"></div>
            <div class="u-flex__cell u-mg--sm u-pd--sm loading-animation u-hide-small--flex"></div>
            <div class="u-flex__cell u-mg--sm u-pd--sm loading-animation u-show-large-only--flex"></div>
          </div>
          <hr>
          <div class="row-loader u-flex">
            <div class="u-flex__cell u-mg--sm u-pd--sm loading-animation"></div>
            <div class="u-flex__cell u-mg--sm u-pd--sm loading-animation u-hide-small--flex"></div>
            <div class="u-flex__cell u-mg--sm u-pd--sm loading-animation u-show-large-only--flex"></div>
          </div>
        </td>
      </tr>
      
    </tbody>
  </table>
</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      
    }
  },
  mounted() {
    setTimeout ( function() {
    $( '.js-table-row-load-1' ).show();
}, 3000 );

setTimeout ( function() {
    $( '.js-table-row-load-2' ).show();
}, 4500 );

setTimeout ( function() {
    $( '.js-table-row-loader' ).hide();
}, 6000 );
  },
  methods: {
    
  },
}
</script>
<style lang="css" scoped>

body {
  background-color: #e7e7e7;
  font-family: "Open Sans", sans-serif;
  font-weight: 100;
  font-size: 13px;
}

* {
  margin: 0;
  padding: 0;
}

.hide {
  display: none;
}

.card {
  background-color: #fff;
  border: 1px solid;
  border-color: #e5e6e9 #dfe0e4 #d0d1d5;
  border-radius: 5px;
  padding: 12px;
  margin: 20px auto 20px;
  max-width: 472px;
  min-height: 200px;
}
.card--loading {
  height: 250px;
}
.card--reset {
  min-height: auto;
  text-align: center;
}
.card--reset a {
  color: #3b97ff;
  text-decoration: none;
}

table {
  border: 1px solid #efefef;
  border-radius: 5px;
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: #f7f7f7;
}

th {
  padding: 10px;
  text-align: left;
  border: none;
}

tbody tr {
  border-bottom: 1px solid #efefef;
}

td {
  padding: 10px;
  border-right: 1px solid #efefef;
}

.table-cell-loader {
  padding: 0;
}

.table__date {
  width: 60px;
}
.table__descrip {
  width: 250px;
}
.table__amount {
  width: 100px;
}
.table__other {
  width: 20px;
}

.table__icon {
  color: #3b97ff;
  font-size: 18px;
}

@keyframes placeHolderShimmer {
  0% {
    background: #ececec;
  }
  30% {
    background: #F7F7F7;
  }
  50% {
    background: #ececec;
  }
  80% {
    background: #F7F7F7;
  }
  100% {
    background: #ececec;
  }
}
.loading-animation {
  animation: placeHolderShimmer 3s infinite;
}

.mask {
  background: #fff;
  position: absolute;
  height: 10px;
}

.mask--b-b {
  top: 0;
  width: 100%;
  height: 1px;
  right: 0;
  background: #efefef;
}
.mask--t {
  height: 10px;
  width: 100%;
}
.mask--b {
  height: 10px;
  width: 100%;
  bottom: 0;
}
.mask--r {
  height: 30px;
  width: 10px;
  right: 0;
}
.mask--l {
  height: 30px;
  width: 10px;
  left: 0;
}
.mask--sep-1 {
  width: 20px;
  right: 340px;
  height: 30px;
}
.mask--sep-2 {
  width: 20px;
  right: 185px;
  height: 30px;
}
.mask--sep-3 {
  width: 20px;
  right: 73px;
  height: 30px;
}

.u-pd-y--md {
  padding: 25px 0 25px;
}

.u-pd--xs {
  padding: 5px;
}

.u-pd--sm {
  padding: 10px;
}

hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #efefef;
  padding: 0;
}

.u-mg--xs {
  margin: 5px;
}

.u-mg--sm {
  margin: 10px;
}

.u-mg--md {
  margin: 15px;
}

.u-flex {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
}

.u-flex__cell {
  flex: 1;
}

.icon-container {
  border-left: 1px solid #efefef;
}

.u-hide-small--flex {
  display: none;
}

@media only screen and (min-width: 768px) {
  .u-hide-small--flex {
    display: inline-block;
  }
}
.u-show-large-only--flex {
  display: none;
}

@media only screen and (min-width: 960px) {
  .u-show-large-only--flex {
    display: inline-block;
  }
}
  
</style>