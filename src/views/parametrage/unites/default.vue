<template>
  <div>
    <div class="content-header">
      <div class="d-flex align-items-center justify-content-between">
        <h3 class="page-title">Unites</h3>
        <div class="d-inline-block align-items-center">
          <nav>
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/"><i class="mdi mdi-home-outline"></i></router-link>
              </li>
              <li class="breadcrumb-item" aria-current="page">SIM</li>
              <li class="breadcrumb-item active" aria-current="page">Unites</li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
    <div class="box">
      <div class="box-header with-border p-2">
        <div class="p-15">
          <Unites></Unites>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Unites from "@/components/parametrages/unites.vue";
export default {
  components: {
    Unites,
  },
};
</script>
<style lang="css" scoped></style>
