<View style={styles.viewModalRow}>
<Text style={styles.viewModalLabel}>First Name:</Text>
<TextInput
  style={styles.viewModalInput}
  value={editedContact.firstName}
  onChangeText={(text) =>
    setEditedContact({ ...editedContact, firstName: text })
  }
/>
</View>
<View style={styles.viewModalRow}>
<Text style={styles.viewModalLabel}>Last Name:</Text>
<TextInput
  style={styles.viewModalInput}
  value={editedContact.lastName}
  onChangeText={(text) =>
    setEditedContact({ ...editedContact, lastName: text })
  }
/>
</View>
<View style={styles.viewModalRow}>
<Text style={styles.viewModalLabel}>Category:</Text>
<TextInput
  style={styles.viewModalInput}
  value={editedContact.category}
  onChangeText={(text) =>
    setEditedContact({ ...editedContact, category: text })
  }
/>
</View>
<View style={styles.viewModalRow}>
<Text style={styles.viewModalLabel}>Email:</Text>
<TextInput
  style={styles.viewModalInput}
  value={editedContact.email}
  onChangeText={(text) =>
    setEditedContact({ ...editedContact, email: text })
  }
/>
</View>
<View style={styles.viewModalRow}>
<Text style={styles.viewModalLabel}>Phone:</Text>
<TextInput
  style={styles.viewModalInput}
  value={editedContact.phone}
  onChangeText={(text) =>
    setEditedContact({ ...editedContact, phone: text })
  }
/>
</View>
<TouchableOpacity
style={styles.modalButton}
onPress={() => {
  updateContact(editedContact);
  setEditingContact(false);
  setModalVisible(false);
}}
>
<Text style={styles.modalButtonText}>Save</Text>
</TouchableOpacity>