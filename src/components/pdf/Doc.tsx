import { Document, Page, View, Text, StyleSheet, Image } from "@react-pdf/renderer";
import { Biodata } from "../BiodataForm";

const styles = StyleSheet.create({
  page: { padding: 20, fontSize: 12 },
  h1: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  bold: { fontWeight: "bold" },
  photo: { width: 100, height: 120, borderRadius: 60, marginBottom: 10 },
});

export default function BiodataDoc({
  data,
  photo,
}: {
  data: Biodata;
  photo?: string;
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.h1}>Marriage Biodata</Text>
          {photo && <Image src={photo} style={styles.photo} />}
          <Text>
            <Text style={styles.bold}>Name: </Text>
            {data.fullName}
          </Text>
          <Text>
            <Text style={styles.bold}>Date of Birth: </Text>
            {data.dob || "—"}
          </Text>
          <Text>
            <Text style={styles.bold}>Height: </Text>
            {data.height || "—"}
          </Text>
          {data.customFields?.map(({ key, value }) => (
            <Text key={key}>
              <Text style={styles.bold}>{key}: </Text>
              {value}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
}
