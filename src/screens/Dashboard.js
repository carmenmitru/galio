import React from 'react';
import { StyleSheet, Platform, View } from 'react-native';
import { LineChart, XAxis } from 'react-native-svg-charts';
import { Defs, LinearGradient, Stop } from 'react-native-svg';
import { LinearGradient as Gradient } from 'expo';
import * as shape from 'd3-shape';
import theme from '../../theme';

// galio components
import { Text, Button, Block, NavBar } from 'galio-framework';

const BASE_SIZE = theme.SIZES.BASE;
const GRADIENT_BLUE = ['#6B84CA', '#8F44CE'];
const GRADIENT_PINK = ['#D442F8', '#B645F5', '#9B40F8'];

const LineGradient = ({ index }) => (
  <Defs key={index}>
    <LinearGradient id={'gradient'} x1={'0%'} y1={'0%'} x2={'0%'} y2={'100%'}>
      <Stop offset={'0%'} stopColor={'rgb(134, 65, 244)'} stopOpacity={0.8} />
      <Stop offset={'100%'} stopColor={'rgb(254, 70, 207)'} stopOpacity={0.2} />
    </LinearGradient>
  </Defs>
);
const Header = ({}) => (
  <Block left>
    <Text color={theme.COLORS.GREY} h5>
      Balance
    </Text>
    <Text style={{ marginVertical: theme.SIZES.FONT / 4 }} h3>
      $ 346.932
    </Text>
  </Block>
);

const BalanceCard = ({ data, labels }) => {
  return (
    <View style={styles.card}>
      <Header />
      <LineChart
        style={{ height: 150 }}
        data={data}
        belowChart={true}
        contentInset={{ top: 30, bottom: 10, left: 0, right: 10 }}
        curve={shape.curveNatural}
        svg={{ stroke: 'url(#gradient)', strokeWidth: 6 }}
      >
        <LineGradient />
      </LineChart>
      <Block row space="evenly" style={{ marginTop: BASE_SIZE }}>
        <Labels data={labels} />
      </Block>
    </View>
  );
};
const Labels = ({ data }) =>
  data.map((item, index) => (
    <Text
      key={index}
      size={theme.SIZES.FONT * 0.85}
      color={theme.COLORS.GREY}
      alignmentBaseline={'middle'}
    >
      {item}
    </Text>
  ));

class Dashbord extends React.Component {
  constructor() {
    super();
  }

  render() {
    const data = [50, 80, 60, 95, 120];
    const labels = ['04/11', '05/11', '06/11', '07/11', '08/11'];

    return (
      <Block safe flex>
        <NavBar
          title="Dashboard"
          onLeftPress={() => this.props.navigation.openDrawer()}
          leftIconColor={theme.COLORS.MUTED}
          right={
            <Button
              color="transparent"
              style={styles.settings}
              onPress={() => this.props.navigation.openDrawer()}
            ></Button>
          }
          style={
            Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null
          }
        />
        <Block style={styles.container}>
          <BalanceCard data={data} labels={labels} />
          <View
            style={{
              height:200
            }}
          >
            <View style={{ width:"50%"}}>
              <Gradient
                start={[0.45, 0.45]}
                end={[0.8, 0.8]}
                colors={GRADIENT_PINK}
                style={[styles.gradient, styles.card, styles.pendingCashCard]}
              >
                <Text color={theme.COLORS.WHITE} h5>
                  Pending Cash
                </Text>
                <Text color={theme.COLORS.WHITE} h2>
                  $29.042
                </Text>
                <LineChart
                  style={styles.chart}
                  data={data}
                  height={100}
                  svg={{ stroke: '#ffffff', strokeWidth: 4 }}
                  curve={shape.curveNatural}
                  contentInset={{ top: 20, bottom: 20 }}
                ></LineChart>
              </Gradient>
            </View>
            <View>
              <Text>Right</Text>
            </View>
          </View>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 14,
    justifyContent: 'flex-start',
    backgroundColor: theme.COLORS.WHITE,
  },
  card: {
    padding: 14,
    borderRadius: 3,
    borderColor: 'red',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 5,
    shadowOpacity: 0.24,
    borderRadius: 5,
  },
  chart: {
    height: 100,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 5,
    shadowOpacity: 0.24,
  },
  pendingCashCard: {
    marginTop: 5,
  },
  gradient:{
    flex: 1,
  }
});

export default Dashbord;
