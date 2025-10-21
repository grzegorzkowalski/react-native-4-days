import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  SectionList,
  TouchableOpacity,
  SectionListData,
  SectionListRenderItem
} from "react-native";

interface ContactItem {
  id: string;
  name: string;
  phone: string;
}

interface ContactSection {
  title: string;
  data: ContactItem[];
}

const SectionListExample: React.FC = () => {
  const sections: SectionListData<ContactItem>[] = [
    {
      title: "A",
      data: [
        { id: "1", name: "Alice Johnson", phone: "+1 234 567 8901" },
        { id: "2", name: "Andrew Smith", phone: "+1 234 567 8902" },
        { id: "3", name: "Anna Davis", phone: "+1 234 567 8903" },
      ],
    },
    {
      title: "B",
      data: [
        { id: "4", name: "Bob Wilson", phone: "+1 234 567 8904" },
        { id: "5", name: "Betty Brown", phone: "+1 234 567 8905" },
      ],
    },
    {
      title: "C",
      data: [
        { id: "6", name: "Charlie Miller", phone: "+1 234 567 8906" },
        { id: "7", name: "Catherine Lee", phone: "+1 234 567 8907" },
        { id: "8", name: "Chris Taylor", phone: "+1 234 567 8908" },
      ],
    },
    {
      title: "D",
      data: [
        { id: "9", name: "David Anderson", phone: "+1 234 567 8909" },
        { id: "10", name: "Diana Garcia", phone: "+1 234 567 8910" },
      ],
    },
    {
      title: "E",
      data: [
        { id: "11", name: "Emily Martinez", phone: "+1 234 567 8911" },
        { id: "12", name: "Edward Thompson", phone: "+1 234 567 8912" },
        { id: "13", name: "Eva Rodriguez", phone: "+1 234 567 8913" },
      ],
    },
  ];

  const renderItem: SectionListRenderItem<ContactItem> = ({ item, index, section }) => (
    <TouchableOpacity style={styles.item}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
      </View>
      <View style={styles.itemContent}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPhone}>{item.phone}</Text>
      </View>
      <View style={styles.itemIndex}>
        <Text style={styles.indexText}>{index + 1}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderSectionHeader = ({ section }: { section: SectionListData<ContactItem> }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{section.title}</Text>
      <Text style={styles.sectionCount}>({section.data.length} contacts)</Text>
    </View>
  );

  const renderSectionFooter = ({ section }: { section: SectionListData<ContactItem> }) => (
    <View style={styles.sectionFooter}>
      <Text style={styles.sectionFooterText}>
        End of {section.title} section
      </Text>
    </View>
  );

  const renderSeparator = () => (
    <View style={styles.separator} />
  );

  const renderListHeader = () => (
    <View style={styles.listHeader}>
      <Text style={styles.listHeaderTitle}>Contacts Directory</Text>
      <Text style={styles.listHeaderSubtitle}>Organized alphabetically by first name</Text>
    </View>
  );

  const renderListFooter = () => (
    <View style={styles.listFooter}>
      <Text style={styles.listFooterText}>
        Total: {sections.reduce((total, section) => total + section.data.length, 0)} contacts
      </Text>
    </View>
  );

  const keyExtractor = (item: ContactItem, index: number) => item.id;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SectionList Example</Text>
      
      <SectionList
        sections={sections}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        renderSectionFooter={renderSectionFooter}
        keyExtractor={keyExtractor}
        style={styles.sectionList}
        ListHeaderComponent={renderListHeader}
        ListFooterComponent={renderListFooter}
        ItemSeparatorComponent={renderSeparator}
        stickySectionHeadersEnabled={true}
        showsVerticalScrollIndicator={true}
      />

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>SectionList Key Props:</Text>
        <Text style={styles.infoText}>• sections - Array of section objects</Text>
        <Text style={styles.infoText}>• renderItem - Function to render each item</Text>
        <Text style={styles.infoText}>• renderSectionHeader - Function to render section headers</Text>
        <Text style={styles.infoText}>• renderSectionFooter - Function to render section footers</Text>
        <Text style={styles.infoText}>• stickySectionHeadersEnabled - Sticky headers</Text>
        <Text style={styles.infoText}>• keyExtractor - Function to generate unique keys</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "#333",
  },
  sectionList: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 15,
  },
  listHeader: {
    padding: 20,
    backgroundColor: "#007AFF",
    alignItems: "center",
  },
  listHeaderTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  listHeaderSubtitle: {
    fontSize: 14,
    color: "white",
    opacity: 0.9,
    marginTop: 5,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#495057",
  },
  sectionCount: {
    fontSize: 12,
    color: "#6c757d",
  },
  sectionFooter: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: "#f8f9fa",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  sectionFooterText: {
    fontSize: 12,
    color: "#6c757d",
    fontStyle: "italic",
    textAlign: "center",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: "white",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  avatarText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  itemContent: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  itemPhone: {
    fontSize: 14,
    color: "#666",
  },
  itemIndex: {
    width: 30,
    height: 20,
    backgroundColor: "#e9ecef",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  indexText: {
    fontSize: 12,
    color: "#495057",
    fontWeight: "500",
  },
  separator: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginLeft: 70,
  },
  listFooter: {
    padding: 15,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
  },
  listFooterText: {
    fontSize: 14,
    color: "#495057",
    fontWeight: "500",
  },
  infoContainer: {
    backgroundColor: "white",
    padding: 15,
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

export default SectionListExample;
