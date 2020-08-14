import React, { Component } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import Header from './src/header';
import axios from 'axios';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import Fontisto from 'react-native-vector-icons/dist/Fontisto';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';

// hooks 


class App extends Component {
  constructor(props) {
    super(props);
    var todayDate = new Date().toISOString().slice(0, 10)
    this.state = {
      infected: "",
      deceased: "",
      tested: "",
      recovered: "",
      todayInfected: "",
      todayDeceased: "",
      todayTested: "",
      todayRecovered: "",
      today: todayDate,
      data: []
    };
  }

  componentDidMount() {
    axios.get('https://api.apify.com/v2/key-value-stores/28ljlt47S5XEd1qIi/records/LATEST?disableRedirect=true')
      .then(response => {
        let data = response.data;
        this.setState({
          tested: data['tested'],
          infected: data['infected'],
          deceased: data['deceased'],
          recovered: data['recovered'],
          todayTested: data['dailyTested'],
          todayInfected: data['dailyInfected'],
          todayDeceased: data['dailyDeceased'],
          todayRecovered: data['dailyRecovered']
        });
      })
    axios.get('https://api.covid19api.com/summary')
      .then(response => {
        let data2 = response.data.Global;
        this.setState({
          wTodayInfected: data2['NewConfirmed'],
          wInfected: data2['TotalConfirmed'],
          wTodayDeceased: data2['NewDeaths'],
          wDeceased: data2['TotalDeaths'],
          wTodayRecovered: data2['NewRecovered'],
          wRecovered: data2['TotalRecovered'],
        });
      })
  }

  renderCard(TrC, title, WrlC, icon) {
    const { container, sampleText, sampleTextToday, deceasedNumber } = styles

    return (
      <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', ...sampleText }}>
        <View>
          {/* <Text style={{color: '#999', fontSize: 16}}>Türkiye</Text> */}
          <Text style={{ color: '#990009', fontSize: 25 }}>{TrC}</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          {icon}
          <Text style={{ color: '#555', marginTop: 5, fontSize: 16 }}>{title}</Text>
        </View>

        <View>
          {/* <Text style={{color: '#999', fontSize: 16}}>Dünya</Text> */}
          <Text style={{ color: '#990009', fontSize: 25, textAlign: 'right', paddingRight: 10 }}>{WrlC}</Text>
        </View>
      </View>
    )
  }
  render() {
    const { container, sampleText, sampleTextToday, informationText, info } = styles
    const { tested, infected, deceased, recovered, todayTested, todayInfected, todayDeceased, todayRecovered, today } = this.state;
    const { wTodayInfected, wInfected, wTodayDeceased, wDeceased, wTodayRecovered, wRecovered } = this.state;
    const { headerText, header } = styles;

    //const menu = <Menu navigator={navigator}/>;
    return (
      <View style={container}>
        <ScrollView contentContainerStyle={{ width: '100%', alignItems: 'center', paddingBottom: 20 }}>
          <Header headerText="#evdekalTürkiye"></Header>

          <Text style={sampleTextToday}>Tarih: {today.slice(8, 10)}/{today.slice(5, 7)}/{today.slice(0, 4)}</Text>

          <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              {/* <Text style={{color: '#999', fontSize: 16}}>Türkiye</Text> */}
              <Text style={{ color: '#000', fontSize: 25 }}>{"Türkiye"}</Text>
            </View>
            <View>
              {/* <Text style={{color: '#999', fontSize: 16}}>Dünya</Text> */}
              <Text style={{ color: '#000', fontSize: 25, textAlign: 'right' }}>{"Dünya"}</Text>
            </View>
          </View>
          {this.renderCard(todayTested, "Test Sayısı", 'Bilinmiyor', <Fontisto name="test-tube" size={24} color="#DDD" />)}
          {this.renderCard(todayInfected, "Hasta Sayısı", wTodayInfected, <FontAwesome5 name="pills" size={24} color="#DDD" />)}
          {this.renderCard(todayRecovered, "İyileşen Sayısı", wTodayRecovered, <MaterialIcons name="healing" size={24} color="#DDD" />)}
          {this.renderCard(todayDeceased, "Ölüm Sayısı", wTodayDeceased, <FontAwesome5 name="skull" size={24} color="#DDD" />)}


          <View style={{ width: "90%", paddingTop: 20, }}>
            <Text style={informationText}>Covid19 Hakkında Bilmemiz Gerekenler</Text>
            <View style={header}>
              <Image
                style={header}
                source={{ uri: 'https://www.istairport.com/tr/covid19/PublishingImages/ciga-lounge-1.png' }}
              />

            </View>
            
            <View>
              <Text style={{
                flexDirection: 'row',
                color: '#21409A',
                fontSize: 25,
              }}>Semptomlar</Text>
              <Text style={{fontSize:16,color:'red',paddingTop:5,paddingBottom:10}}>Enfekte olan kişilerde ortaya çıkan ilk belirtiler :</Text>
              <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', ...informationText }}>
                <Image
                  style={info}
                  source={{ uri: 'https://koronavirus.gov.mk/wp-content/uploads/2020/03/5925230-corona-virus-coronavirus-covid19-fever-high-temperature.png' }}
                />
                <Text style ={{paddingRight:80,paddingBottom:80,fontSize:20}}>Yüksek Ateş</Text>
              </View>
              <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', ...informationText }}>
                <Image
                  style={info}
                  source={{ uri: 'https://koronavirus.gov.mk/wp-content/uploads/2020/03/5925233-corona-virus-coronavirus-cough-coughing-covid19-symptom.png' }}
                />
                <Text style ={{paddingRight:80,paddingBottom:80,fontSize:20}}>Şiddetli Öksürük</Text>
              </View>
              <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', ...informationText }}>
                <Image
                  style={info}
                  source={{ uri: 'https://koronavirus.gov.mk/wp-content/uploads/2020/03/5925232-breathe-breathing-corona-virus-coronavirus-problem-shortness-trouble.png' }}
                />
                <Text style ={{paddingRight:80,paddingBottom:80,fontSize:20}}>Solunum Yetmezliği</Text>
              </View>
            </View>
            <View>
              <Text style={{
                flexDirection: 'row',
                color: '#21409A',
                fontSize: 25,
              }}>Korunma Yolları</Text>
              <Text style={{fontSize:16,color:'red',paddingTop:5,paddingBottom:10}}>Korona virüse karşı alınabilecek tedbirler:</Text>
              <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', ...informationText }}>
                <Image
                  style={info}
                  source={{ uri: 'https://koronavirus.gov.mk/wp-content/uploads/2020/03/5925226-corona-virus-coronavirus-covid19-hand-soap-wash-1.png' }}
                />
                <Text style ={{paddingRight:80,paddingBottom:80,fontSize:20}}>Ellerinizi sık sık yıkayın veya dezenfekte edin.</Text>
              </View>
              <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', ...informationText }}>
                <Image
                  style={info}
                  source={{ uri: 'https://koronavirus.gov.mk/wp-content/uploads/2020/03/5929220-avatar-network-sharing-social-spreading.png' }}
                />
                <Text style ={{paddingRight:80,paddingBottom:80,fontSize:20}}>Yakın temastan kaçının.</Text>
              </View>
              
              <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', ...informationText }}>
                <Image
                  style={info}
                  source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQZuiPMbU8TmBNg8T86X6Io9nPsfaxCyNnqXg&usqp=CAU' }}
                />
                <Text style ={{paddingRight:80,paddingBottom:80,fontSize:20}}>Evinizin dışında maske kullanın.</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2fbf3',
  },
  sampleTextToday: {

    fontSize: 20,
    paddingTop: 10,
    textAlign: 'center',
    paddingBottom: 20,
    fontWeight: '800',
    textAlignVertical: 'auto',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    color: '#3f48cc',
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,

  },

  sampleText: {
    alignSelf: 'center',
    flexDirection: 'row',
    // borderWidth: 1,
    backgroundColor: '#FFF',
    borderRadius: 14,
    marginTop: 10,
    padding: 10,
    width: '95%',
    fontSize: 20,
    //
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,

  },

  informationText: {
    textAlign: 'center',
    flexDirection: 'row',
    color: '#21409A',
    fontSize: 20,

  },
  header: {
    paddingTop: 0,
    height: 350,
    width: '100%',
    marginTop: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 100,
  },
  headerText: {
    paddingTop: 0,
    // marginTop:-30,
    // marginLeft:-240,
    position: 'absolute',
    bottom: 5,
    left: 30,

    fontSize: 20,
    textAlign: 'center',
    color: '#FFF',

  },
  info: {
    height: 120,
    width: 120,
    marginBottom:20,
  }




});

export default App;
