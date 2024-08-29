<template>
  <div>
    <div class="content-header">
      <div class="d-flex align-items-center justify-content-between">
        <h3 class="page-title">Profil</h3>
        <div class="d-inline-block align-items-center">
          <nav>
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/"><i class="mdi mdi-home-outline"></i></router-link>
              </li>
              <li class="breadcrumb-item" aria-current="page">SIM</li>
              <li class="breadcrumb-item active" aria-current="page">Profil</li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
    <div class="box">
      <Profil></Profil>
    </div>
  </div>
</template>

<script>
import Profil from "@/components/parametrages/profils.vue";
export default {
  components: {
	Profil,
  },
};
</script>
<style lang="css" scoped></style>
