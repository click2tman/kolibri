<template>

  <div v-if="isUserLoggedIn">
    <div ref="icon" class="points" :style="{ color: $coreTextAnnotation }">
      <PointsIcon class="icon" :active="true" />
      <div class="description">
        <div class="description-value">
          {{ $formatNumber(totalPoints) }}
        </div>
      </div>
    </div>
    <KTooltip
      reference="icon"
      :refs="$refs"
    >
      {{ $tr('pointsTooltip', { points: totalPoints }) }}
    </KTooltip>
  </div>

</template>


<script>

  import { mapGetters } from 'vuex';
  import PointsIcon from 'kolibri.coreVue.components.PointsIcon';
  import KTooltip from 'kolibri.coreVue.components.KTooltip';

  export default {
    name: 'TotalPoints',
    $trs: { pointsTooltip: 'You earned { points, number } points' },
    components: {
      PointsIcon,
      KTooltip,
    },
    computed: {
      ...mapGetters(['totalPoints', 'currentUserId', 'isUserLoggedIn', '$coreTextAnnotation']),
    },
    watch: { currentUserId: 'fetchPoints' },
    created() {
      this.$store.dispatch('fetchPoints');
    },
  };

</script>


<style lang="scss" scoped>

  .points {
    padding: 8px 0;
  }

  .icon {
    position: relative;
    top: 2px;
    display: inline-block;
    width: 16px;
    height: 16px;
  }

  .description {
    display: inline-block;
    margin-left: 16px;
  }

</style>
