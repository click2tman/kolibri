<template>

  <div class="notification">
    <p class="context icon-spacer">{{ context }}</p>
    <KGrid>
      <KGridItem :size="time ? 50 : 75" percentage>
        <StatusIcon
          :icon="icon"
          class="icon"
        />
        <div class="icon-spacer">
          <slot></slot>
        </div>
      </KGridItem>
      <KGridItem v-if="time" :size="25" percentage alignment="center">
        {{ time }}
      </KGridItem>
      <KGridItem :size="25" percentage>
        <div class="button-wrapper">
          <KRouterLink
            v-if="targetPage"
            appearance="flat-button"
            class="show-btn"
            :text="coachStrings.$tr('showAction')"
            :to="newCoachRoute(targetPage)"
          />
        </div>
      </KGridItem>
    </KGrid>
  </div>

</template>


<script>

  import imports from '../../imports';
  import StatusIcon from '../status/StatusIcon';

  export default {
    name: 'NotificationCard',
    components: {
      StatusIcon,
    },
    mixins: [imports],
    props: {
      targetPage: {
        type: String,
        required: false,
      },
      icon: {
        type: String,
        required: true,
      },
      // group name
      learnerContext: {
        type: String,
        required: false,
      },
      // exam or lesson name
      contentContext: {
        type: String,
        required: false,
      },
      // exam or lesson name
      time: {
        type: String,
        required: false,
      },
    },
    computed: {
      context() {
        if (this.learnerContext && this.contentContext) {
          return `${this.learnerContext} • ${this.contentContext}`;
        } else if (this.learnerContext) {
          return this.learnerContext;
        } else if (this.contentContext) {
          return this.contentContext;
        }
        return '';
      },
    },
  };

</script>


<style lang="scss" scoped>

  .icon {
    position: absolute;
  }

  .icon-spacer {
    margin-left: 40px;
  }

  .notification {
    position: relative;
    padding-top: 4px;
    padding-bottom: 4px;
    margin-bottom: 16px;
    text-decoration: none;
    border-top: 1px solid rgb(223, 223, 223);
  }

  .context {
    margin-top: 4px;
    margin-bottom: 4px;
    font-size: small;
    color: gray;
  }

  .button-wrapper {
    position: relative;
  }

  .show-btn {
    position: absolute;
    top: -15px;
    right: 0;
  }

</style>
