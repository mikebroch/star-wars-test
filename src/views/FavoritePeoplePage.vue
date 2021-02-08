<template>
  <div class="favorite-page-wrapper">
    <fulfilling-bouncing-circle-spinner
      class="spinner"
      v-if="isLoadingData"
      :animation-duration="4000"
      :size="60"
      color="#FFE81F"
    />

    <el-card class="box-card" v-if="!isLoadingData">
      <div slot="header" class="clearfix">
        <span>Любимые герои</span>
      </div>
      <div
        v-for="(item, index) in getFavoritePeople"
        :key="index"
        class="text item"
      >
        <span v-if="getFavoritePeople.length > 0">{{ item.name }}</span>
        <span v-else>Нет избранных героев</span>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { FulfillingBouncingCircleSpinner } from "epic-spinners";

export default {
  name: "Favorite",
  components: {
    FulfillingBouncingCircleSpinner
  },
  async created() {
    this.$store.commit("SET_LOADING_DATA", true);
    await Promise.all([this.$store.dispatch("getPeopleById")]);
    this.$store.commit("SET_LOADING_DATA", false);
  },
  computed: {
    ...mapState({
      isLoadingData: state => state.isloadingData
    }),
    ...mapGetters(["getFavoritePeople"])
  },
  beforeDestroy() {
    this.$store.commit("SET_FAVORITE_PEOPLE", []);
  }
};
</script>

<style lang="scss">
.favorite-page-wrapper {
  display: flex;
  justify-content: center;
}
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  margin-top: 50px;
  width: 480px;
}
</style>
