import React, {Component,useContext,useEffect,useState} from 'react';
import {Page, Text, View, Document, StyleSheet, PDFViewer,PDFDownloadLink} from '@react-pdf/renderer'
import {DataContext} from 'context/DataContext'


const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});
	//const {userItemList} = useContext(DataContext);
const PdfDocument = (props) => {
	var lst = ['paul','michelle','erik','steve','patty','ruth']
	//const {userItemList} = useContext(DataContext);
	const [item, SetItems] = useState([]);
	const [dataload, setDataLoad] = useState(false)
		useEffect(()=>{
		SetItems([]);
		SetItems(props.List)
		setDataLoad(true);
	},[props.List])

	// for (var key in item){
	// 	console.log(item[key].product);
	// }
	//console.log(props.List.length)
	return(
	  <Document>
	    <Page size="A4" style={styles.page}>
	      <View style={styles.section}>
	        <Text>Section #1{"\n"}</Text>
	        <Text>This is it{"\n"}</Text>
	        {
	        	console.log(props.List)
	        	//props.List?props.List.map((a,index)=>{return(<Text>{a.product}</Text>)}):""
	        }
	        <Text>Here we are</Text>
	        
	      </View>
	      <View style={styles.section}>
	        <Text>Section #2</Text>
	      </View>
	    </Page>
	  </Document>
	)
};
const MyDocument = (props) => {
	const {userItemList} = useContext(DataContext);
	//console.log(userItemList.length);





	//userItemList.forEach(item=>console.log(item))

	return(	
		<PDFDownloadLink document={<PdfDocument List={userItemList}  />} fileName="somename.pdf">
      {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
    </PDFDownloadLink>
	)
}
export default MyDocument;