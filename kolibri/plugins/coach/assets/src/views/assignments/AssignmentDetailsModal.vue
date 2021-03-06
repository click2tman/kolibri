<template>

  <KModal
    :title="modalTitle"
    :hasError="showServerError || !formIsValid"
    :submitText="isInEditMode ? $tr('save') : $tr('continue')"
    :cancelText="$tr('cancel')"
    @submit="submitData"
    @cancel="closeModal"
  >
    <UiAlert
      v-if="showServerError"
      type="error"
      :dismissible="false"
    >
      {{ submitErrorMessage }}
    </UiAlert>
    <KTextbox
      ref="titleField"
      v-model="title"
      :label="$tr('titlePlaceholder')"
      :maxlength="50"
      :autofocus="true"
      :invalid="titleIsInvalid"
      :invalidText="titleIsInvalidText"
      :disabled="formIsSubmitted"
      @blur="titleIsVisited = true"
    />
    <KTextbox
      v-if="showDescriptionField"
      v-model="description"
      :label="$tr('description')"
      :maxlength="200"
      :disabled="formIsSubmitted"
    />

    <fieldset>
      <legend>{{ $tr('assignedGroupsLabel') }}</legend>
      <RecipientSelector
        v-model="selectedCollectionIds"
        :groups="groups"
        :classId="classId"
        :disabled="formIsSubmitted"
      />
    </fieldset>
  </KModal>

</template>


<script>

  import xor from 'lodash/xor';
  import KModal from 'kolibri.coreVue.components.KModal';
  import KTextbox from 'kolibri.coreVue.components.KTextbox';
  import UiAlert from 'keen-ui/src/UiAlert';
  import RecipientSelector from './RecipientSelector';

  export default {
    name: 'AssignmentDetailsModal',
    components: {
      KModal,
      KTextbox,
      RecipientSelector,
      UiAlert,
    },
    props: {
      modalTitle: {
        type: String,
        required: true,
      },
      submitErrorMessage: {
        type: String,
        required: true,
      },
      showDescriptionField: {
        type: Boolean,
        required: true,
      },
      isInEditMode: {
        type: Boolean,
        required: true,
      },
      initialTitle: {
        type: String,
        required: true,
      },
      initialDescription: {
        type: String,
        required: false,
        default: null,
      },
      initialSelectedCollectionIds: {
        type: Array,
        required: true,
      },
      classId: {
        type: String,
        required: true,
      },
      groups: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        // set default values
        title: this.initialTitle,
        description: this.initialDescription,
        selectedCollectionIds: this.initialSelectedCollectionIds,
        titleIsVisited: false,
        formIsSubmitted: false,
        showServerError: false,
      };
    },
    computed: {
      formData() {
        return {
          title: this.title,
          description: this.description,
          assignments: this.selectedCollectionIds.map(groupId => ({ collection: groupId })),
        };
      },
      titleIsInvalidText() {
        // submission is handled because "blur" event happens on submit
        if (this.titleIsVisited) {
          if (this.title === '') {
            return this.$tr('fieldRequiredErro');
          }
        }
        return '';
      },
      titleIsInvalid() {
        return Boolean(this.titleIsInvalidText);
      },
      formIsValid() {
        return !this.titleIsInvalid;
      },
      groupsHaveChanged() {
        const unsharedIds = xor(this.selectedCollectionIds, this.initialSelectedCollectionIds);
        return unsharedIds.length > 0;
      },
      detailsHaveChanged() {
        return (
          this.initialTitle !== this.title ||
          this.initialDescription !== this.description ||
          this.groupsHaveChanged
        );
      },
    },
    methods: {
      submitData() {
        this.showServerError = false;
        // Return immediately if "submit" has already been clicked
        if (this.formIsSubmitted) {
          // IDEA a loading indictor or something would probably be handy
          return;
        }

        if (this.formIsValid) {
          this.formIsSubmitted = true;
          if (!this.detailsHaveChanged) {
            this.closeModal();
            return;
          }

          return this.isInEditMode
            ? this.$emit('save', this.formData)
            : this.$emit('continue', this.formData);
        } else {
          // shouldn't ever be true, but being safe
          this.formIsSubmitted = false;
          this.$refs.titleField.focus();
        }
      },
      // NOTE: this method is not used inside the method, but may be called
      // from a parent component
      handleSubmitFailure() {
        this.formIsSubmitted = false;
        this.showServerError = true;
      },
      closeModal() {
        this.$emit('cancel');
      },
    },
    $trs: {
      cancel: 'Cancel',
      continue: 'Continue',
      description: 'Description',
      fieldRequiredErro: 'This field is required',
      save: 'Save',
      titlePlaceholder: 'Title',
      assignedGroupsLabel: 'Visible to',
    },
  };

</script>


<style lang="scss" scoped>

  fieldset {
    padding: 0;
    margin: 0;
    border: 0;
  }

  legend {
    padding-top: 16px;
    padding-bottom: 8px;
  }

</style>
