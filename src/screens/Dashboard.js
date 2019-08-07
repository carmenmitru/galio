import React from 'react';
import { StyleSheet, Platform, View } from 'react-native';
import { LineChart,XAxis } from 'react-native-svg-charts';
import { Defs, LinearGradient, Stop } from 'react-native-svg';
import * as shape from 'd3-shape';
import theme from '../theme';

// galio components
import { Text, Button, Block, NavBar } from 'galio-framework';
const BASE_SIZE = theme.SIZES.BASE;

const Gradient = ({ index }) => (
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
const Labels = ({data}) =>
data.map((item, index) => (
    <Text
        key={index}
        size={theme.SIZES.FONT * 0.85}
        color={theme.COLORS.GREY}
        alignmentBaseline={'middle'}
    >
        {item}
    </Text>
))


class Dashbord extends React.Component {
  constructor() {
    super();
  }

  render() {
    const data = [50, 80, 60, 95, 120];
    const labels = ["04/11","05/11","06/11","07/11","08/11"]

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
              onPress={() => this.props.navigation.openDrawer()}></Button>
          }
          style={Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null}
        />
        <Block style={styles.container}>
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
              <Gradient />

            </LineChart>
            <Block row space="evenly" style={{ marginTop: BASE_SIZE }}>
                <Labels data={labels}/>
            </Block>
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
    backgroundColor: '#fff',
    borderRadius: 2,
    borderColor: theme.COLORS.GREY,
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0.3,
    },
  },
});

export default Dashbord;
