import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { SafeAreaView, ScrollView } from 'react-native';

const TermsAndConditionsModal = ({ modalVisible, setModalVisible }) => {


  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <SafeAreaView>
          <ScrollView>
            <Text style={styles.modalTitle}>Terms and Conditions</Text>
            <Text style={styles.modalText}>
              Thank you for choosing to subscribe to our mobile app. By subscribing to our mobile app, you agree to the following terms and conditions:
            </Text>
            <Text style={styles.modalText}>
              Subscription Policy: Our mobile app subscription policy does not include a refund after 8 days of purchase. If you decide to cancel your subscription within 8 days of purchase, you will be entitled to a full refund. Please note that texting costs will be non-refundable as it is managed by a 3rd party provider. Additionally, cancellation will not be prorated.
            </Text>
            <Text style={styles.modalText}>
              Subscription Details: Our yearly subscription plan includes access to your lifetime database that contains all contacts and outreach contacts that you registered during your subscription period. You will have access to this database for the lifetime of our mobile app.
            </Text>
            <Text style={styles.modalText}>
              Subscription Fee: The subscription fee for our mobile app is a yearly cost of $100. Anything  extra will be added towards the per/text cost.
            </Text>
            <Text style={styles.modalText}>
              Text cost: The texting fee for our mobile app is $9 for every 100 text that is sent.
            </Text>
            <Text style={styles.modalText}>
              Payment Process: We use Stripe to process all subscription payments. By subscribing to our mobile app, you agree to our payment terms and conditions.
            </Text>
            <Text style={styles.modalText}>
              Changes to the Terms and Conditions: We reserve the right to modify our terms and conditions at any time. If we make any changes to our terms and conditions, we will notify you via email or through our mobile app.
            </Text>
            <Text style={styles.modalText}>
              Privacy Policy: Our mobile app is subject to our Privacy Policy. By subscribing to our mobile app, you agree to our Privacy Policy.
            </Text>
            <Text style={styles.modalText}>
              Contact Us: If you have any questions or concerns about our mobile app subscription policy, please contact us at tech.and.faith.contact@gmail.com
            </Text>
            <TouchableOpacity style={styles.closeModalButton}  onPress={() => setModalVisible(true)}>
              <Text style={styles.closeModalButtonText}>Close</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignItems: 'center',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    alignItems: 'center',
    textAlign: 'center',
    margin: 20
  },
  subscriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    alignItems: 'center',
    textAlign: 'center',
  },
  amountButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  selectedAmountButton: {
    backgroundColor: 'blue',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    justifyContent:'center'
  },
  amountButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
  },
  selectedAmountButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    alignItems: 'center',
  },
  subscribeButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  subscribeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    alignItems: 'center',
  },
  closeModalButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  closeModalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    alignItems: 'center',
  },
  // cardContainer: {
  //   // flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   marginVertical: 30,
  //   alignItems: 'center',
  // },
  // cardNumber: {
  //   width: '50%',
  // },
  // cardExpiry: {
  //   width: '25%',
  // },
  // cardCVC: {
  //   width: '25%',
  // },
});

export default TermsAndConditionsModal;

