<template>
  <div class="app-wrapper">
    <div class="app-wrapper__search-input">
      <el-input
        type="text"
        prefix-icon="el-icon-search"
        placeholder="Введите имя"
        v-model="searchName"
        @input="getPeople"
      >
      </el-input>
    </div>
    <fulfilling-bouncing-circle-spinner
      class="spinner"
      v-if="isLoadingData"
      :animation-duration="4000"
      :size="60"
      color="#FFE81F"
    />

    <div style="width: 100%; height: 100%" v-if="!isLoadingData">
      <el-row :gutter="12">
        <el-col
          style="margin-bottom: 10px"
          :span="4"
          v-for="(item, index) in getPeopleData"
          :key="index"
        >
          <el-card
            shadow="hover"
            :body-style="{ padding: '0px' }"
            class="card-wrapper"
          >
            <img
              :src="
                `https://starwars-visualguide.com/assets/img/characters/${item.id}.jpg`
              "
              class="image"
            />
            <div class="card__label" style="padding: 14px">
              {{ item.name }}
              <div style="cursor: pointer" @click="addFavoriteItem(item)">
                <font-awesome-icon
                  v-if="item.favorite"
                  size="2x"
                  :icon="['fas', 'heart']"
                />
                <font-awesome-icon v-else size="2x" :icon="['far', 'heart']" />
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div class="pagination">
      <el-pagination
        :total="count"
        :current-page="currentPage"
        layout="prev, pager, next"
        background
        @current-change="changeCurrentPage"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { FulfillingBouncingCircleSpinner } from "epic-spinners";
export default {
  name: "People",
  components: {
    FulfillingBouncingCircleSpinner
  },
  data: () => {
    return {
      currentPage: 1,
      searchName: ""
    };
  },

  created() {
    this.getPeople();
  },

  computed: {
    ...mapGetters(["getPeopleData"]),
    ...mapState({
      count: state => state.count,
      isLoadingData: state => state.isloadingData
    })
  },

  methods: {
    addFavoriteItem(data) {
      this.getPeopleData.map(i => {
        if (i.id === data.id) {
          i.favorite = !i.favorite;
        } else {
          return i;
        }
      });
      this.$store.commit("SET_FAVORITE_PEOPLE_ID", data.id);
      this.$store.commit("SET_PEOPLE", this.getPeopleData);
    },
    changeCurrentPage(newPageNumber) {
      this.currentPage = newPageNumber;
      this.getPeople();
    },
    async getPeople() {
      this.$store.commit("SET_LOADING_DATA", true);
      await this.$store.dispatch("getPeople", {
        page: this.currentPage,
        name: this.searchName
      });
      this.$store.commit("SET_LOADING_DATA", false);
    }
  }
};
</script>

<style lang="scss" scoped>
.card-wrapper {
}

.pagination {
  display: flex;
}
.app-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  &__search-input {
    padding: 15px;
  }
}
.card {
  display: flex;
  flex-direction: column;
  height: 200px;
  width: 200px;
  &__label {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.image {
  width: 100%;
  display: block;
}
</style>
