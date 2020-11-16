import React, {useEffect, useState} from 'react';
import {StyleSheet, View, SafeAreaView, ScrollView} from 'react-native';
import PreSeasonCard from './PreSeasonCard';
import {Title, Text} from 'react-native-paper';
import players from '../../../assets/players.json';

export const PreSeasonView = (props) => {
  const [mvp, setMvp] = useState(''),
    [defPoty, setDefPoty] = useState(''),
    [mostImprovedPlayer, setMostImprovedPlayer] = useState(''),
    [rookieOfTheYear, setRookieOfTheYear] = useState(''),
    [coachOfTheYear, setCoachOfTheYear] = useState(''),
    [sixthManOfTheYear, setSixthManOfTheYear] = useState(''),
    [pgAllNbaFirstTeam, setPGAllNbaFirstTeam] = useState(''),
    [sgAllNbaFirstTeam, setSGAllNbaFirstTeam] = useState(''),
    [sfAllNbaFirstTeam, setSFAllNbaFirstTeam] = useState(''),
    [pfAllNbaFirstTeam, setPFAllNbaFirstTeam] = useState(''),
    [cAllNbaFirstTeam, setCAllNbaFirstTeam] = useState(''),
    [pgAllRookieFirstTeam, setPGAllRookieFirstTeam] = useState(''),
    [sgAllRookieFirstTeam, setSGAllRookieFirstTeam] = useState(''),
    [sfAllRookieFirstTeam, setSFAllRookieFirstTeam] = useState(''),
    [pfAllRookieFirstTeam, setPFAllRookieFirstTeam] = useState(''),
    [cAllRookieFirstTeam, setCAllRookieFirstTeam] = useState(''),
    [pgAllNbaDefensiveTeam, setPGAllNbaDefensiveTeam] = useState(''),
    [sgAllNbaDefensiveTeam, setSGAllNbaDefensiveTeam] = useState(''),
    [sfAllNbaDefensiveTeam, setSFAllNbaDefensiveTeam] = useState(''),
    [pfAllNbaDefensiveTeam, setPFAllNbaDefensiveTeam] = useState(''),
    [cAllNbaDefensiveTeam, setCAllNbaDefensiveTeam] = useState('');
  useEffect(() => {
    if (Object.keys(props.awards).length !== 0) {
      let playerIDMvp = null;
      let playerIDDefPoty = null;
      let playerIDMostImprovedPlayer = null;
      let playerIDRookieOfTheYear = null;
      let playerIDCoachOfTheYear = null;
      let playerIDSixthManOfTheYear = null;
      let playerIDPGAllNbaFirstTeam = null;
      let playerIDSGAllNbaFirstTeam = null;
      let playerIDSFAllNbaFirstTeam = null;
      let playerIDPFAllNbaFirstTeam = null;
      let playerIDCAllNbaFirstTeam = null;
      let playerIDPGAllRookieFirstTeam = null;
      let playerIDSGAllRookieFirstTeam = null;
      let playerIDSFAllRookieFirstTeam = null;
      let playerIDPFAllRookieFirstTeam = null;
      let playerIDCAllRookieFirstTeam = null;
      let playerIDPGAllNbaDefensiveTeam = null;
      let playerIDSGAllNbaDefensiveTeam = null;
      let playerIDSFAllNbaDefensiveTeam = null;
      let playerIDPFAllNbaDefensiveTeam = null;
      let playerIDCAllNbaDefensiveTeam = null;

      if (props.awards.individual !== undefined) {
        playerIDMvp = props.awards.individual.MVP;
        playerIDDefPoty = props.awards.individual.defPoty;
        playerIDMostImprovedPlayer = props.awards.individual.mostImprovedPlayer;
        playerIDRookieOfTheYear = props.awards.individual.rookieOfTheYear;
        playerIDCoachOfTheYear = props.awards.individual.coachOfTheYear;
        playerIDSixthManOfTheYear = props.awards.individual.sixthManOfTheYear;
      }

      if (props.awards.allNbaFirstTeam !== undefined) {
        playerIDPGAllNbaFirstTeam = props.awards.allNbaFirstTeam.PG;
        playerIDSGAllNbaFirstTeam = props.awards.allNbaFirstTeam.SG;
        playerIDSFAllNbaFirstTeam = props.awards.allNbaFirstTeam.SF;
        playerIDPFAllNbaFirstTeam = props.awards.allNbaFirstTeam.PF;
        playerIDCAllNbaFirstTeam = props.awards.allNbaFirstTeam.C;
      }

      if (props.awards.allRookieFirstTeam !== undefined) {
        playerIDPGAllRookieFirstTeam = props.awards.allRookieFirstTeam.PG;
        playerIDSGAllRookieFirstTeam = props.awards.allRookieFirstTeam.SG;
        playerIDSFAllRookieFirstTeam = props.awards.allRookieFirstTeam.SF;
        playerIDPFAllRookieFirstTeam = props.awards.allRookieFirstTeam.PF;
        playerIDCAllRookieFirstTeam = props.awards.allRookieFirstTeam.C;
      }

      if (props.awards.allNbaDefensiveTeam !== undefined) {
        playerIDPGAllNbaDefensiveTeam = props.awards.allNbaDefensiveTeam.PG;
        playerIDSGAllNbaDefensiveTeam = props.awards.allNbaDefensiveTeam.SG;
        playerIDSFAllNbaDefensiveTeam = props.awards.allNbaDefensiveTeam.SF;
        playerIDPFAllNbaDefensiveTeam = props.awards.allNbaDefensiveTeam.PF;
        playerIDCAllNbaDefensiveTeam = props.awards.allNbaDefensiveTeam.C;
      }

      for (const player of players) {
        if (player.playerId === playerIDMvp) {
          setMvp(player.firstName + ' ' + player.lastName);
        }
        if (player.playerId === playerIDDefPoty) {
          setDefPoty(player.firstName + ' ' + player.lastName);
        }
        if (player.playerId === playerIDMostImprovedPlayer) {
          setMostImprovedPlayer(player.firstName + ' ' + player.lastName);
        }
        if (player.playerId === playerIDRookieOfTheYear) {
          setRookieOfTheYear(player.firstName + ' ' + player.lastName);
        }
        if (player.playerId === playerIDCoachOfTheYear) {
          setCoachOfTheYear(player.firstName + ' ' + player.lastName);
        }
        if (player.playerId === playerIDSixthManOfTheYear) {
          setSixthManOfTheYear(player.firstName + ' ' + player.lastName);
        }
        if (player.playerId === playerIDPGAllNbaFirstTeam) {
          setPGAllNbaFirstTeam(player.firstName + ' ' + player.lastName);
        }
        if (player.playerId === playerIDSGAllNbaFirstTeam) {
          setSGAllNbaFirstTeam(player.firstName + ' ' + player.lastName);
        }
        if (player.playerId === playerIDSFAllNbaFirstTeam) {
          setSFAllNbaFirstTeam(player.firstName + ' ' + player.lastName);
        }
        if (player.playerId === playerIDPFAllNbaFirstTeam) {
          setPFAllNbaFirstTeam(player.firstName + ' ' + player.lastName);
        }
        if (player.playerId === playerIDCAllNbaFirstTeam) {
          setCAllNbaFirstTeam(player.firstName + ' ' + player.lastName);
        }

        if (player.playerId === playerIDPGAllRookieFirstTeam) {
          setPGAllRookieFirstTeam(player.firstName + ' ' + player.lastName);
        }
        if (player.playerId === playerIDSGAllRookieFirstTeam) {
          setSGAllRookieFirstTeam(player.firstName + ' ' + player.lastName);
        }
        if (player.playerId === playerIDSFAllRookieFirstTeam) {
          setSFAllRookieFirstTeam(player.firstName + ' ' + player.lastName);
        }
        if (player.playerId === playerIDPFAllRookieFirstTeam) {
          setPFAllRookieFirstTeam(player.firstName + ' ' + player.lastName);
        }
        if (player.playerId === playerIDCAllRookieFirstTeam) {
          setCAllRookieFirstTeam(player.firstName + ' ' + player.lastName);
        }

        if (player.playerId === playerIDPGAllNbaDefensiveTeam) {
          setPGAllNbaDefensiveTeam(player.firstName + ' ' + player.lastName);
        }
        if (player.playerId === playerIDSGAllNbaDefensiveTeam) {
          setSGAllNbaDefensiveTeam(player.firstName + ' ' + player.lastName);
        }
        if (player.playerId === playerIDSFAllNbaDefensiveTeam) {
          setSFAllNbaDefensiveTeam(player.firstName + ' ' + player.lastName);
        }
        if (player.playerId === playerIDPFAllNbaDefensiveTeam) {
          setPFAllNbaDefensiveTeam(player.firstName + ' ' + player.lastName);
        }
        if (player.playerId === playerIDCAllNbaDefensiveTeam) {
          setCAllNbaDefensiveTeam(player.firstName + ' ' + player.lastName);
        }
      }
    }
  }, [props.awards]);

  return (
    <>
      <SafeAreaView style={styles.safeContainer}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.bigContainerTitle}>Individual Awards</Text>
          <PreSeasonCard
            text="MVP"
            player={mvp}
            image={require('../../../assets/question.png')}
            onPress={() => props.goToPlayerChooser('MVP', 'individual')}
          />
          <PreSeasonCard
            text="Defensive Player of the Year"
            player={defPoty}
            image={require('../../../assets/question.png')}
            onPress={() => props.goToPlayerChooser('defPoty', 'individual')}
          />
          <PreSeasonCard
            text="Most Improved Player"
            player={mostImprovedPlayer}
            image={require('../../../assets/question.png')}
            onPress={() =>
              props.goToPlayerChooser('mostImprovedPlayer', 'individual')
            }
          />
          <PreSeasonCard
            text="Rookie of the Year"
            player={rookieOfTheYear}
            image={require('../../../assets/question.png')}
            onPress={() =>
              props.goToPlayerChooser('rookieOfTheYear', 'individual')
            }
          />
          <PreSeasonCard
            text="Coach of the Year"
            player={coachOfTheYear}
            image={require('../../../assets/question.png')}
            onPress={() =>
              props.goToPlayerChooser('coachOfTheYear', 'individual')
            }
          />
          <PreSeasonCard
            text="6th Man of the Year"
            player={sixthManOfTheYear}
            image={require('../../../assets/question.png')}
            onPress={() =>
              props.goToPlayerChooser('sixthManOfTheYear', 'individual')
            }
          />
          <View style={styles.bigContainer}>
            <Text style={styles.bigContainerTitle}>All NBA First Team</Text>
            <PreSeasonCard
              text="Point Guard"
              player={pgAllNbaFirstTeam}
              image={require('../../../assets/question.png')}
              onPress={() => props.goToPlayerChooser('PG', 'allNbaFirstTeam')}
            />
            <PreSeasonCard
              text="Shooting Guard"
              player={sgAllNbaFirstTeam}
              image={require('../../../assets/question.png')}
              onPress={() => props.goToPlayerChooser('SG', 'allNbaFirstTeam')}
            />
            <PreSeasonCard
              text="Small Forward"
              player={sfAllNbaFirstTeam}
              image={require('../../../assets/question.png')}
              onPress={() => props.goToPlayerChooser('SF', 'allNbaFirstTeam')}
            />
            <PreSeasonCard
              text="Point Forward"
              player={pfAllNbaFirstTeam}
              image={require('../../../assets/question.png')}
              onPress={() => props.goToPlayerChooser('PF', 'allNbaFirstTeam')}
            />
            <PreSeasonCard
              text="Center"
              player={cAllNbaFirstTeam}
              image={require('../../../assets/question.png')}
              onPress={() => props.goToPlayerChooser('C', 'allNbaFirstTeam')}
            />
          </View>
          <View style={styles.bigContainerRookie}>
            <Text style={styles.bigContainerTitle}>All Rookie First Team</Text>
            <PreSeasonCard
              text="Point Guard"
              player={pgAllRookieFirstTeam}
              image={require('../../../assets/question.png')}
              onPress={() =>
                props.goToPlayerChooser('PG', 'allRookieFirstTeam')
              }
            />
            <PreSeasonCard
              text="Shooting Guard"
              player={sgAllRookieFirstTeam}
              image={require('../../../assets/question.png')}
              onPress={() =>
                props.goToPlayerChooser('SG', 'allRookieFirstTeam')
              }
            />
            <PreSeasonCard
              text="Small Forward"
              player={sfAllRookieFirstTeam}
              image={require('../../../assets/question.png')}
              onPress={() =>
                props.goToPlayerChooser('SF', 'allRookieFirstTeam')
              }
            />
            <PreSeasonCard
              text="Point Forward"
              player={pfAllRookieFirstTeam}
              image={require('../../../assets/question.png')}
              onPress={() =>
                props.goToPlayerChooser('PF', 'allRookieFirstTeam')
              }
            />
            <PreSeasonCard
              text="Center"
              player={cAllRookieFirstTeam}
              image={require('../../../assets/question.png')}
              onPress={() => props.goToPlayerChooser('C', 'allRookieFirstTeam')}
            />
          </View>
          <View style={styles.bigContainerDefensive}>
            <Text style={styles.bigContainerTitle}>All NBA Defensive Team</Text>
            <PreSeasonCard
              text="Point Guard"
              player={pgAllNbaDefensiveTeam}
              image={require('../../../assets/question.png')}
              onPress={() =>
                props.goToPlayerChooser('PG', 'allNbaDefensiveTeam')
              }
            />
            <PreSeasonCard
              text="Shooting Guard"
              player={sgAllNbaDefensiveTeam}
              image={require('../../../assets/question.png')}
              onPress={() =>
                props.goToPlayerChooser('SG', 'allNbaDefensiveTeam')
              }
            />
            <PreSeasonCard
              text="Small Forward"
              player={sfAllNbaDefensiveTeam}
              image={require('../../../assets/question.png')}
              onPress={() =>
                props.goToPlayerChooser('SF', 'allNbaDefensiveTeam')
              }
            />
            <PreSeasonCard
              text="Point Forward"
              player={pfAllNbaDefensiveTeam}
              image={require('../../../assets/question.png')}
              onPress={() =>
                props.goToPlayerChooser('PF', 'allNbaDefensiveTeam')
              }
            />
            <PreSeasonCard
              text="Center"
              player={cAllNbaDefensiveTeam}
              image={require('../../../assets/question.png')}
              onPress={() =>
                props.goToPlayerChooser('C', 'allNbaDefensiveTeam')
              }
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  cardContainer: {
    height: 300,
  },
  bigContainer: {
    backgroundColor: '#c38a3a',
    marginTop: 20,
  },
  bigContainerRookie: {
    backgroundColor: '#ff7d44',
  },
  bigContainerDefensive: {
    backgroundColor: '#dd4731',
  },
  bigContainerTitle: {
    textAlign: 'center',
    fontSize: 40,
  },
});
