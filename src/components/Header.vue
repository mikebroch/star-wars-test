<template>
  <el-header class="app-header">
    <router-link to="/">
      <div class="app-header__logo">
        <Logo />
      </div>
    </router-link>
    <el-badge :value="favoritePeopleId.length">
      <div class="app-header__svg" @click="goToFavoritePeople">
        <FavoriteListIcon />
      </div>
    </el-badge>
  </el-header>
</template>

<script>
import Logo from "./Logo";
import FavoriteListIcon from "./FavoriteListIcon";
import { mapState } from "vuex";
export default {
  name: "Header",
  components: {
    Logo,
    FavoriteListIcon
  },
  computed: {
    ...mapState({
      favoritePeopleId: state => state.favoritePeopleId
    })
  },
  methods: {
    goToFavoritePeople() {
      this.$router.push({ name: "Favorite" });
    }
  }
};
</script>

<style scoped lang="scss">
.app-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 66px !important;
  background-color: #fff;
  border-bottom: 1px solid #dee2e6;
  &__svg {
    cursor: pointer;
    height: 50px;
    width: 50px;
    margin-bottom: 10px;
  }
}
</style>
