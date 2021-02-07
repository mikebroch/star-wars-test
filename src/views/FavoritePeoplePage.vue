<template>
  <div class="favorite-page-wrapper">
    <el-card class="box-card">
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
import { mapGetters } from "vuex";

export default {
  name: "Favorite",
  created() {
    this.$store.dispatch("getPeopleById");
  },
  computed: {
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
