export default {
  template: `
    <div class="note-actions">
      <i class="fa-solid fa-palette" title="Background color" @click="$emit('onBgClick')"></i>
      <i class="fa-solid fa-trash-can" title="Remove note" @click="$emit('onRemove')"></i>
      <i class="fa-solid fa-clone" title="Duplicate" @click="$emit('onDuplicate')"></i>
      <i class="fa-solid fa-envelope" title="Send to mail" @click="$emit('onSendMail')"></i>
    </div>
  `
}