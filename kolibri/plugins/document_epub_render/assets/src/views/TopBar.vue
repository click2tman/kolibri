<template>

  <div class="top-bar" :style="{ backgroundColor: $coreGrey200 }">
    <KGrid>
      <KGridItem
        sizes="25, 25, 25"
        :percentage="true"
        alignment="left"
      >
        <TocButton
          ref="tocButton"
          @click="$emit('tableOfContentsButtonClicked')"
        />
      </KGridItem>
      <KGridItem
        sizes="25, 50, 50"
        :percentage="true"
        alignment="center"
      >
        <h2
          v-if="title"
          class="top-bar-title"
        >
          {{ title }}
        </h2>
      </KGridItem>
      <KGridItem
        sizes="50, 25, 25"
        :percentage="true"
        alignment="right"
      >
        <SettingsButton
          ref="settingsButton"
          @click="$emit('settingsButtonClicked')"
        />

        <SearchButton
          ref="searchButton"
          @click="$emit('searchButtonClicked')"
        />

        <UiIconButton
          ref="fullscreenButton"
          type="secondary"
          :disableRipple="true"
          :ariaLabel="$tr('toggleFullscreen')"
          @click="$emit('fullscreenButtonClicked')"
        >
          <mat-svg
            v-if="isInFullscreen"
            name="fullscreen_exit"
            category="navigation"
          />
          <mat-svg
            v-else
            name="fullscreen"
            category="navigation"
          />
        </UiIconButton>

      </KGridItem>
    </KGrid>
  </div>

</template>


<script>

  import { mapGetters } from 'vuex';
  import KGrid from 'kolibri.coreVue.components.KGrid';
  import KGridItem from 'kolibri.coreVue.components.KGridItem';
  import UiIconButton from 'keen-ui/src/UiIconButton';
  import TocButton from './TocButton';
  import SettingsButton from './SettingsButton';
  import SearchButton from './SearchButton';

  export default {
    name: 'TopBar',
    $trs: {
      toggleFullscreen: 'Toggle fullscreen',
    },
    components: {
      KGrid,
      KGridItem,
      UiIconButton,
      TocButton,
      SettingsButton,
      SearchButton,
    },
    props: {
      title: {
        type: String,
        required: false,
      },
      isInFullscreen: {
        type: Boolean,
        required: true,
      },
    },
    computed: {
      ...mapGetters(['$coreGrey200']),
    },
    methods: {
      focusOnTocButton() {
        this.$refs.tocButton.$el.focus();
      },
      focusOnSettingsButton() {
        this.$refs.settingsButton.$el.focus();
      },
      focusOnSearchButton() {
        this.$refs.searchButton.$el.focus();
      },
    },
  };

</script>


<style lang="scss" scoped>

  @import './EpubStyles';

  .top-bar {
    z-index: 4;
    box-shadow: $epub-box-shadow;
  }

  .top-bar-title {
    @include truncate-text;

    margin: 0;
    line-height: 36px;
  }

</style>
