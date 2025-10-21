import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions
} from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ModalExample: React.FC = () => {
  const [basicModalVisible, setBasicModalVisible] = useState<boolean>(false);
  const [slideModalVisible, setSlideModalVisible] = useState<boolean>(false);
  const [fadeModalVisible, setFadeModalVisible] = useState<boolean>(false);
  const [fullScreenModalVisible, setFullScreenModalVisible] = useState<boolean>(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState<boolean>(false);
  const [customModalVisible, setCustomModalVisible] = useState<boolean>(false);
  const [transparentModalVisible, setTransparentModalVisible] = useState<boolean>(false);

  const showAlert = (title: string, message: string) => {
    Alert.alert(title, message);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Modal Component Example</Text>
      
      {/* Basic Modal */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Modal</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setBasicModalVisible(true)}
        >
          <Text style={styles.buttonText}>Show Basic Modal</Text>
        </TouchableOpacity>
        
        <Modal
          visible={basicModalVisible}
          animationType="none"
          transparent={false}
          onRequestClose={() => setBasicModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Basic Modal</Text>
              <Text style={styles.modalText}>
                This is a basic modal without any animation.
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setBasicModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      {/* Slide Animation Modal */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Slide Animation Modal</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setSlideModalVisible(true)}
        >
          <Text style={styles.buttonText}>Show Slide Modal</Text>
        </TouchableOpacity>
        
        <Modal
          visible={slideModalVisible}
          animationType="slide"
          transparent={false}
          onRequestClose={() => setSlideModalVisible(false)}
          presentationStyle="pageSheet"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Slide Modal</Text>
              <Text style={styles.modalText}>
                This modal slides up from the bottom of the screen.
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSlideModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      {/* Fade Animation Modal */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Fade Animation Modal</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setFadeModalVisible(true)}
        >
          <Text style={styles.buttonText}>Show Fade Modal</Text>
        </TouchableOpacity>
        
        <Modal
          visible={fadeModalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setFadeModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.fadeModalContent}>
              <Text style={styles.modalTitle}>Fade Modal</Text>
              <Text style={styles.modalText}>
                This modal fades in and out smoothly.
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setFadeModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      {/* Full Screen Modal */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Full Screen Modal</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setFullScreenModalVisible(true)}
        >
          <Text style={styles.buttonText}>Show Full Screen Modal</Text>
        </TouchableOpacity>
        
        <Modal
          visible={fullScreenModalVisible}
          animationType="slide"
          transparent={false}
          onRequestClose={() => setFullScreenModalVisible(false)}
          presentationStyle="fullScreen"
        >
          <View style={styles.fullScreenModal}>
            <View style={styles.fullScreenHeader}>
              <Text style={styles.fullScreenTitle}>Full Screen Modal</Text>
              <TouchableOpacity
                style={styles.fullScreenCloseButton}
                onPress={() => setFullScreenModalVisible(false)}
              >
                <Text style={styles.fullScreenCloseText}>✕</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.fullScreenContent}>
              <Text style={styles.fullScreenText}>
                This is a full screen modal that takes up the entire screen.
                You can add any content here including forms, lists, or any other components.
              </Text>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.buttonText}>Action Button</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.buttonText}>Another Action</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </Modal>
      </View>

      {/* Bottom Sheet Style Modal */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bottom Sheet Modal</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setBottomSheetVisible(true)}
        >
          <Text style={styles.buttonText}>Show Bottom Sheet</Text>
        </TouchableOpacity>
        
        <Modal
          visible={bottomSheetVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setBottomSheetVisible(false)}
        >
          <TouchableOpacity
            style={styles.bottomSheetOverlay}
            activeOpacity={1}
            onPress={() => setBottomSheetVisible(false)}
          >
            <View style={styles.bottomSheet}>
              <View style={styles.bottomSheetHandle} />
              <Text style={styles.bottomSheetTitle}>Bottom Sheet</Text>
              <TouchableOpacity style={styles.bottomSheetOption}>
                <Text style={styles.bottomSheetOptionText}>Option 1</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.bottomSheetOption}>
                <Text style={styles.bottomSheetOptionText}>Option 2</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.bottomSheetOption}>
                <Text style={styles.bottomSheetOptionText}>Option 3</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.bottomSheetCancel}
                onPress={() => setBottomSheetVisible(false)}
              >
                <Text style={styles.bottomSheetCancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>

      {/* Custom Styled Modal */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Styled Modal</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setCustomModalVisible(true)}
        >
          <Text style={styles.buttonText}>Show Custom Modal</Text>
        </TouchableOpacity>
        
        <Modal
          visible={customModalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setCustomModalVisible(false)}
        >
          <View style={styles.customModalOverlay}>
            <View style={styles.customModalContent}>
              <View style={styles.customModalHeader}>
                <Text style={styles.customModalTitle}>Custom Modal</Text>
                <TouchableOpacity
                  style={styles.customCloseButton}
                  onPress={() => setCustomModalVisible(false)}
                >
                  <Text style={styles.customCloseText}>✕</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.customModalBody}>
                <Text style={styles.customModalText}>
                  This is a custom styled modal with rounded corners, shadows, and custom colors.
                </Text>
                <View style={styles.customModalActions}>
                  <TouchableOpacity
                    style={styles.customCancelButton}
                    onPress={() => setCustomModalVisible(false)}
                  >
                    <Text style={styles.customCancelText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.customConfirmButton}
                    onPress={() => {
                      setCustomModalVisible(false);
                      showAlert("Confirmed", "Action confirmed!");
                    }}
                  >
                    <Text style={styles.customConfirmText}>Confirm</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>

      {/* Transparent Modal */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Transparent Modal</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setTransparentModalVisible(true)}
        >
          <Text style={styles.buttonText}>Show Transparent Modal</Text>
        </TouchableOpacity>
        
        <Modal
          visible={transparentModalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setTransparentModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.transparentOverlay}
            activeOpacity={1}
            onPress={() => setTransparentModalVisible(false)}
          >
            <TouchableOpacity
              style={styles.transparentModalContent}
              activeOpacity={1}
              onPress={() => {}}
            >
              <Text style={styles.transparentModalTitle}>Info</Text>
              <Text style={styles.transparentModalText}>
                This is a transparent modal with a semi-transparent background.
                Tap outside to close.
              </Text>
              <TouchableOpacity
                style={styles.transparentOkButton}
                onPress={() => setTransparentModalVisible(false)}
              >
                <Text style={styles.transparentOkText}>OK</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      </View>

      {/* Info Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Modal Component Key Props:</Text>
        <Text style={styles.infoText}>• visible - Controls modal visibility</Text>
        <Text style={styles.infoText}>• animationType - Animation type (none, slide, fade)</Text>
        <Text style={styles.infoText}>• transparent - Whether background is transparent</Text>
        <Text style={styles.infoText}>• onRequestClose - Called when user tries to close</Text>
        <Text style={styles.infoText}>• presentationStyle - How modal is presented</Text>
        <Text style={styles.infoText}>• onShow - Called when modal is shown</Text>
        <Text style={styles.infoText}>• onDismiss - Called when modal is dismissed</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    margin: 20,
    color: "#333",
  },
  section: {
    margin: 15,
    padding: 15,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
    lineHeight: 22,
  },
  closeButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  fadeModalContent: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  fullScreenModal: {
    flex: 1,
    backgroundColor: "white",
  },
  fullScreenHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  fullScreenTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  fullScreenCloseButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreenCloseText: {
    fontSize: 16,
    color: "#666",
  },
  fullScreenContent: {
    flex: 1,
    padding: 20,
  },
  fullScreenText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#666",
    marginBottom: 30,
  },
  actionButton: {
    backgroundColor: "#34C759",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  bottomSheetOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  bottomSheet: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 10,
    paddingBottom: 34,
    paddingHorizontal: 20,
  },
  bottomSheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#ccc",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 20,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  bottomSheetOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  bottomSheetOptionText: {
    fontSize: 16,
    color: "#007AFF",
    textAlign: "center",
  },
  bottomSheetCancel: {
    paddingVertical: 15,
    marginTop: 10,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
  },
  bottomSheetCancelText: {
    fontSize: 16,
    color: "#dc3545",
    textAlign: "center",
    fontWeight: "600",
  },
  customModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  customModalContent: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "white",
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 20,
  },
  customModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#007AFF",
  },
  customModalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  customCloseButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  customCloseText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  customModalBody: {
    padding: 20,
  },
  customModalText: {
    fontSize: 16,
    lineHeight: 22,
    color: "#666",
    marginBottom: 20,
  },
  customModalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  customCancelButton: {
    flex: 1,
    paddingVertical: 12,
    marginRight: 10,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    alignItems: "center",
  },
  customCancelText: {
    color: "#6c757d",
    fontSize: 16,
    fontWeight: "600",
  },
  customConfirmButton: {
    flex: 1,
    paddingVertical: 12,
    marginLeft: 10,
    backgroundColor: "#28a745",
    borderRadius: 8,
    alignItems: "center",
  },
  customConfirmText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  transparentOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  transparentModalContent: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    width: "100%",
    maxWidth: 300,
    alignItems: "center",
  },
  transparentModalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  transparentModalText: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
    lineHeight: 20,
  },
  transparentOkButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 6,
  },
  transparentOkText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  infoContainer: {
    margin: 15,
    padding: 15,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  infoText: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
});

export default ModalExample;
