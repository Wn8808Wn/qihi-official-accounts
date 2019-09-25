<template>
    <div class="loading">
        <div v-transfer-dom>
            <loading :show="loading" ></loading>
        </div>
    </div>
</template>


<script> 
import { Loading, TransferDomDirective as TransferDom } from "vux";

export default {
  directives: {
    TransferDom
  },
  components: {
    Loading
  },
  data() {
    return {
      loading: true
    };
  },
  beforeRouteEnter(to, from, next) {
    next( vm =>{
      this.loading = false;
    });
  }
};
</script>

<style lang="scss" scoped>
</style>
