import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Switch,
  ScrollView,
  Alert
} from "react-native";

const SwitchExample: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<boolean>(true);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [wifi, setWifi] = useState<boolean>(true);
  const [bluetooth, setBluetooth] = useState<boolean>(false);
  const [locationServices, setLocationServices] = useState<boolean>(true);
  const [autoSync, setAutoSync] = useState<boolean>(false);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: false,
    smsNotifications: true,
    backgroundRefresh: false,
    autoUpdate: true,
    dataSaver: false,
    privacyMode: false,
    analyticsTracking: true,
  });

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const handleSettingChange = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const showSwitchAlert = (switchName: string, value: boolean) => {
    Alert.alert(
      "Switch Changed",
      `${switchName} is now ${value ? "ON" : "OFF"}`
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Switch Component Example</Text>
      
      {/* Basic Switch */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Switch</Text>
        <Text style={styles.sectionDescription}>
          Simple on/off toggle switch
        </Text>
        
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Basic Switch</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <Text style={styles.switchStatus}>
          Status: {isEnabled ? "Enabled" : "Disabled"}
        </Text>
      </View>

      {/* Different Colors */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Different Colors</Text>
        
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Notifications</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#34C759" }}
            thumbColor={notifications ? "#fff" : "#f4f3f4"}
            onValueChange={(value) => {
              setNotifications(value);
              showSwitchAlert("Notifications", value);
            }}
            value={notifications}
          />
        </View>
        
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Dark Mode</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#FF6B6B" }}
            thumbColor={darkMode ? "#fff" : "#f4f3f4"}
            onValueChange={setDarkMode}
            value={darkMode}
          />
        </View>
        
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Wi-Fi</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#007AFF" }}
            thumbColor={wifi ? "#fff" : "#f4f3f4"}
            onValueChange={setWifi}
            value={wifi}
          />
        </View>
        
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Bluetooth</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#5856D6" }}
            thumbColor={bluetooth ? "#fff" : "#f4f3f4"}
            onValueChange={setBluetooth}
            value={bluetooth}
          />
        </View>
      </View>

      {/* Settings Panel */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings Panel</Text>
        <Text style={styles.sectionDescription}>
          Real-world usage example
        </Text>
        
        <View style={styles.settingsGroup}>
          <Text style={styles.groupTitle}>Notifications</Text>
          
          <View style={styles.switchRow}>
            <View style={styles.labelContainer}>
              <Text style={styles.switchLabel}>Push Notifications</Text>
              <Text style={styles.switchSubLabel}>Receive notifications on your device</Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#34C759" }}
              thumbColor={settings.pushNotifications ? "#fff" : "#f4f3f4"}
              onValueChange={() => handleSettingChange('pushNotifications')}
              value={settings.pushNotifications}
            />
          </View>
          
          <View style={styles.switchRow}>
            <View style={styles.labelContainer}>
              <Text style={styles.switchLabel}>Email Notifications</Text>
              <Text style={styles.switchSubLabel}>Get updates via email</Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#34C759" }}
              thumbColor={settings.emailNotifications ? "#fff" : "#f4f3f4"}
              onValueChange={() => handleSettingChange('emailNotifications')}
              value={settings.emailNotifications}
            />
          </View>
          
          <View style={styles.switchRow}>
            <View style={styles.labelContainer}>
              <Text style={styles.switchLabel}>SMS Notifications</Text>
              <Text style={styles.switchSubLabel}>Receive text message alerts</Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#34C759" }}
              thumbColor={settings.smsNotifications ? "#fff" : "#f4f3f4"}
              onValueChange={() => handleSettingChange('smsNotifications')}
              value={settings.smsNotifications}
            />
          </View>
        </View>

        <View style={styles.settingsGroup}>
          <Text style={styles.groupTitle}>App Behavior</Text>
          
          <View style={styles.switchRow}>
            <View style={styles.labelContainer}>
              <Text style={styles.switchLabel}>Background Refresh</Text>
              <Text style={styles.switchSubLabel}>Allow app to refresh in background</Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#007AFF" }}
              thumbColor={settings.backgroundRefresh ? "#fff" : "#f4f3f4"}
              onValueChange={() => handleSettingChange('backgroundRefresh')}
              value={settings.backgroundRefresh}
            />
          </View>
          
          <View style={styles.switchRow}>
            <View style={styles.labelContainer}>
              <Text style={styles.switchLabel}>Auto Update</Text>
              <Text style={styles.switchSubLabel}>Automatically update content</Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#007AFF" }}
              thumbColor={settings.autoUpdate ? "#fff" : "#f4f3f4"}
              onValueChange={() => handleSettingChange('autoUpdate')}
              value={settings.autoUpdate}
            />
          </View>
          
          <View style={styles.switchRow}>
            <View style={styles.labelContainer}>
              <Text style={styles.switchLabel}>Data Saver</Text>
              <Text style={styles.switchSubLabel}>Reduce data usage</Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#FF9500" }}
              thumbColor={settings.dataSaver ? "#fff" : "#f4f3f4"}
              onValueChange={() => handleSettingChange('dataSaver')}
              value={settings.dataSaver}
            />
          </View>
        </View>

        <View style={styles.settingsGroup}>
          <Text style={styles.groupTitle}>Privacy & Security</Text>
          
          <View style={styles.switchRow}>
            <View style={styles.labelContainer}>
              <Text style={styles.switchLabel}>Privacy Mode</Text>
              <Text style={styles.switchSubLabel}>Enhanced privacy protection</Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#FF3B30" }}
              thumbColor={settings.privacyMode ? "#fff" : "#f4f3f4"}
              onValueChange={() => handleSettingChange('privacyMode')}
              value={settings.privacyMode}
            />
          </View>
          
          <View style={styles.switchRow}>
            <View style={styles.labelContainer}>
              <Text style={styles.switchLabel}>Analytics Tracking</Text>
              <Text style={styles.switchSubLabel}>Help improve the app</Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#5856D6" }}
              thumbColor={settings.analyticsTracking ? "#fff" : "#f4f3f4"}
              onValueChange={() => handleSettingChange('analyticsTracking')}
              value={settings.analyticsTracking}
            />
          </View>
        </View>
      </View>

      {/* Advanced Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Advanced Settings</Text>
        
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Show Advanced Options</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#FF6B6B" }}
            thumbColor={showAdvanced ? "#fff" : "#f4f3f4"}
            onValueChange={setShowAdvanced}
            value={showAdvanced}
          />
        </View>
        
        {showAdvanced && (
          <View style={styles.advancedOptions}>
            <Text style={styles.advancedTitle}>Advanced Options</Text>
            
            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Location Services</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#34C759" }}
                thumbColor={locationServices ? "#fff" : "#f4f3f4"}
                onValueChange={setLocationServices}
                value={locationServices}
              />
            </View>
            
            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Auto Sync</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#007AFF" }}
                thumbColor={autoSync ? "#fff" : "#f4f3f4"}
                onValueChange={setAutoSync}
                value={autoSync}
              />
            </View>
          </View>
        )}
      </View>

      {/* Disabled Switch */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Disabled Switch</Text>
        
        <View style={styles.switchRow}>
          <Text style={[styles.switchLabel, styles.disabledLabel]}>
            Disabled Switch (ON)
          </Text>
          <Switch
            trackColor={{ false: "#cccccc", true: "#cccccc" }}
            thumbColor="#f4f3f4"
            disabled={true}
            value={true}
          />
        </View>
        
        <View style={styles.switchRow}>
          <Text style={[styles.switchLabel, styles.disabledLabel]}>
            Disabled Switch (OFF)
          </Text>
          <Switch
            trackColor={{ false: "#cccccc", true: "#cccccc" }}
            thumbColor="#f4f3f4"
            disabled={true}
            value={false}
          />
        </View>
      </View>

      {/* Switch States Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Current Settings Summary</Text>
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>
            🔔 Notifications: {notifications ? "ON" : "OFF"}
          </Text>
          <Text style={styles.summaryText}>
            🌙 Dark Mode: {darkMode ? "ON" : "OFF"}
          </Text>
          <Text style={styles.summaryText}>
            📶 Wi-Fi: {wifi ? "ON" : "OFF"}
          </Text>
          <Text style={styles.summaryText}>
            📡 Bluetooth: {bluetooth ? "ON" : "OFF"}
          </Text>
          <Text style={styles.summaryText}>
            🔄 Auto Sync: {autoSync ? "ON" : "OFF"}
          </Text>
          <Text style={styles.summaryText}>
            📍 Location: {locationServices ? "ON" : "OFF"}
          </Text>
        </View>
      </View>

      {/* Info Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Switch Component Key Props:</Text>
        <Text style={styles.infoText}>• value - The value of the switch (true/false)</Text>
        <Text style={styles.infoText}>• onValueChange - Called when switch value changes</Text>
        <Text style={styles.infoText}>• trackColor - Colors for the track (false/true states)</Text>
        <Text style={styles.infoText}>• thumbColor - Color of the switch thumb</Text>
        <Text style={styles.infoText}>• disabled - Whether the switch is disabled</Text>
        <Text style={styles.infoText}>• ios_backgroundColor - Background color on iOS</Text>
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
    marginBottom: 5,
    color: "#333",
  },
  sectionDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  switchLabel: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  switchSubLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  labelContainer: {
    flex: 1,
    marginRight: 15,
  },
  switchStatus: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
  },
  settingsGroup: {
    marginBottom: 20,
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    marginTop: 10,
  },
  advancedOptions: {
    marginTop: 15,
    padding: 15,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#FF6B6B",
  },
  advancedTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  disabledLabel: {
    color: "#999",
  },
  summaryContainer: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 8,
  },
  summaryText: {
    fontSize: 14,
    color: "#495057",
    marginBottom: 5,
    fontFamily: "monospace",
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

export default SwitchExample;
