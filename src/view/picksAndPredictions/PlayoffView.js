import React, {useEffect, useState} from "react";
import {View} from "react-native";
import { Subheading, Chip, Card, Title, Divider, RadioButton, Paragraph, Button} from "react-native-paper";
import {ScrollView} from "react-native";


export const PlayoffView = (props) => {
    const locked = false; // todo set this variable to if user may change choices
    const [round, setRound] = useState(0)
    const [firstRound, setFirstRound] = useState({})
    const [confSemis, setConfSemis] = useState({})
    const [confFinals, setConfFinals] = useState({})
    const [nbaFinals, setNbaFinals] = useState({})
    const eastTeams = {e1name: "Boston Celtics", e2name: "New York Knicks", e3name: "Toronto Raptors", e4name: "Chicago Bulls", e5name: "Milwaukee Bucks", e6name: "Miami Heat", e7name: "Brooklyn Nets", e8name: "Philadelphia 76ers"}
    const westTeams = {w1name: "Denver Nuggets", w2name: "Golden State Warriors", w3name: "LA Clippers", w4name: "Los Angeles Lakers", w5name: "Sacramento Kings", w6name: "Houston Rockets", w7name: "New Orleans Pelicans", w8name: "San Antonio Spurs"}

    const content = [
        <FirstRound setFirstRound={setFirstRound} next={() => setRound(p => p + 1)} east={eastTeams} west={westTeams} locked={locked}/>,
        <Semis teams={firstRound} setRound={setRound} setConfSemis={setConfSemis} locked={locked}/>,
        <ConfFinals teams={confSemis} setRound={setRound} setNbaFinals={setConfFinals} locked={locked}/>,
        <NBAFinals teams={confFinals} setRound={setRound} setNbaFinals={setNbaFinals} locked={locked}/>,
        <Overview firstRound={firstRound} confSemis={confSemis} confFinals={confFinals} nbaFinals={nbaFinals}/>
    ]

    if (locked) {
        return (
            <Overview firstRound={firstRound} confSemis={confSemis} confFinals={confFinals} nbaFinals={nbaFinals}/>
        );
    }


    return content[round]
}

const FirstRound = (props) => {

    const {e1name, e2name, e3name, e4name, e5name, e6name, e7name, e8name} = props.east
    const {w1name, w2name, w3name, w4name, w5name, w6name, w7name, w8name} = props.west
    const locked = props.locked;

    const[eg1, setEg1] = useState('Pick a winner')
    const[eg2, setEg2] = useState('Pick a winner')
    const[eg3, setEg3] = useState('Pick a winner')
    const[eg4, setEg4] = useState('Pick a winner')

    const[wg1, setWg1] = useState('Pick a winner')
    const[wg2, setWg2] = useState('Pick a winner')
    const[wg3, setWg3] = useState('Pick a winner')
    const[wg4, setWg4] = useState('Pick a winner')

    const [nextDisabled, setNextDisabled] = useState(true)

    function setWinner(setter, winner) {
        setter(winner);
    }

    useEffect(tryNext, [eg1, eg2, eg3, eg4, wg1, wg2, wg3, wg4, nextDisabled])

    function tryNext() {
        if (![eg1, eg2, eg3, eg4, wg1, wg2, wg3, wg4].includes('Pick a winner')) {
            props.setFirstRound({eg1, eg2, eg3, eg4, wg1, wg2, wg3, wg4})
            setNextDisabled(false)
        }
    }

    function next() {

    }

    return (
      <ScrollView style={{flex: 1}}>
          <View style={{flex: 1, flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
              <View style={{flexDirection: "column"}}>
                  <RadioButton.Group onValueChange={value => setWinner(setEg1, value)} value={eg1}>
                      <RadioButton.Item label={e1name} value={e1name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                      <RadioButton.Item label={e2name} value={e2name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                  </RadioButton.Group>
              </View>
              <Card style={{height: 50}}>
                  <Card.Content style={{justifyContent: "center", marginTop: -2}}>
                      <Paragraph ellipsizeMode='tail' numberOfLines={1} style={{width:100}}>
                          {eg1}
                      </Paragraph>
                  </Card.Content>
              </Card>
          </View>
          <Divider style={{height: 2}}/>

          <View style={{flex: 1, flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
              <View style={{flexDirection: "column"}}>
                  <RadioButton.Group onValueChange={value => setWinner(setEg2, value)} value={eg2}>
                      <RadioButton.Item label={e3name} value={e3name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                      <RadioButton.Item label={e4name} value={e4name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                  </RadioButton.Group>
              </View>
              <Card style={{height: 50}}>
                  <Card.Content style={{justifyContent: "center", marginTop: -2}}>
                      <Paragraph ellipsizeMode='tail' numberOfLines={1} style={{width:100}}>
                          {eg2}
                      </Paragraph>
                  </Card.Content>
              </Card>
          </View>
          <Divider style={{height: 2}}/>

          <View style={{flex: 1, flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
              <View style={{flexDirection: "column"}}>
                  <RadioButton.Group onValueChange={value => setWinner(setEg3, value)} value={eg3}>
                      <RadioButton.Item label={e5name} value={e5name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                      <RadioButton.Item label={e6name} value={e6name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                  </RadioButton.Group>
              </View>
              <Card style={{height: 50}}>
                  <Card.Content style={{justifyContent: "center", marginTop: -2}}>
                      <Paragraph ellipsizeMode='tail' numberOfLines={1} style={{width:100}}>
                          {eg3}
                      </Paragraph>
                  </Card.Content>
              </Card>
          </View>
          <Divider style={{height: 2}}/>

          <View style={{flex: 1, flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
              <View style={{flexDirection: "column"}}>
                  <RadioButton.Group onValueChange={value => setWinner(setEg4, value)} value={eg4}>
                      <RadioButton.Item label={e7name} value={e7name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                      <RadioButton.Item label={e8name} value={e8name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                  </RadioButton.Group>
              </View>
              <Card style={{height: 50}}>
                  <Card.Content style={{justifyContent: "center", marginTop: -2}}>
                      <Paragraph ellipsizeMode='tail' numberOfLines={1} style={{width:100}}>
                          {eg4}
                      </Paragraph>
                  </Card.Content>
              </Card>
          </View>
          <Divider style={{height: 2}}/>

          <View style={{flex: 1, flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
              <View style={{flexDirection: "column"}}>
                  <RadioButton.Group onValueChange={value => setWinner(setWg1, value)} value={wg1}>
                      <RadioButton.Item label={w1name} value={w1name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                      <RadioButton.Item label={w2name} value={w2name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                  </RadioButton.Group>
              </View>
              <Card style={{height: 50}}>
                  <Card.Content style={{justifyContent: "center", marginTop: -2}}>
                      <Paragraph ellipsizeMode='tail' numberOfLines={1} style={{width:100}}>
                          {wg1}
                      </Paragraph>
                  </Card.Content>
              </Card>
          </View>
          <Divider style={{height: 2}}/>

          <View style={{flex: 1, flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
              <View style={{flexDirection: "column"}}>
                  <RadioButton.Group onValueChange={value => setWinner(setWg2, value)} value={wg2}>
                      <RadioButton.Item label={w3name} value={w3name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                      <RadioButton.Item label={w4name} value={w4name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                  </RadioButton.Group>
              </View>
              <Card style={{height: 50}}>
                  <Card.Content style={{justifyContent: "center", marginTop: -2}}>
                      <Paragraph ellipsizeMode='tail' numberOfLines={1} style={{width:100}}>
                          {wg2}
                      </Paragraph>
                  </Card.Content>
              </Card>
          </View>
          <Divider style={{height: 2}}/>

          <View style={{flex: 1, flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
              <View style={{flexDirection: "column"}}>
                  <RadioButton.Group onValueChange={value => setWinner(setWg3, value)} value={wg3}>
                      <RadioButton.Item label={w5name} value={w5name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                      <RadioButton.Item label={w6name} value={w6name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                  </RadioButton.Group>
              </View>
              <Card style={{height: 50}}>
                  <Card.Content style={{justifyContent: "center", marginTop: -2}}>
                      <Paragraph ellipsizeMode='tail' numberOfLines={1} style={{width:100}}>
                          {wg3}
                      </Paragraph>
                  </Card.Content>
              </Card>
          </View>
          <Divider style={{height: 2}}/>

          <View style={{flex: 1, flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
              <View style={{flexDirection: "column"}}>
                  <RadioButton.Group onValueChange={value => setWinner(setWg4, value)} value={wg4}>
                      <RadioButton.Item label={w7name} value={w7name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                      <RadioButton.Item label={w8name} value={w8name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                  </RadioButton.Group>
              </View>
              <Card style={{height: 50}}>
                  <Card.Content style={{justifyContent: "center", marginTop: -2}}>
                      <Paragraph ellipsizeMode='tail' numberOfLines={1} style={{width:100}}>
                          {wg4}
                      </Paragraph>
                  </Card.Content>
              </Card>
          </View>
          <Divider style={{height: 2}}/>

          <Button icon={"arrow-right"} disabled={nextDisabled} onPress={() => props.next()}>
              Conference Semi-finals
          </Button>

      </ScrollView>
    );

}

const Semis = (props) => {
    const {eg1: e1name, eg2: e2name, eg3: e3name, eg4: e4name, wg1: w1name, wg2: w2name, wg3: w3name, wg4: w4name} = props.teams

    const [eg1, setEg1] = useState('Pick a winner')
    const [eg2, setEg2] = useState('Pick a winner')
    const [wg1, setWg1] = useState('Pick a winner')
    const [wg2, setWg2] = useState('Pick a winner')

    const [nextDisabled, setNextDisabled] = useState(true)

    function setWinner(setter, winner) {
        setter(winner);
    }

    useEffect(tryNext, [eg1, eg2, wg1, wg2, nextDisabled])

    function tryNext() {
        if (![eg1, eg2, wg1, wg2].includes('Pick a winner')) {
            props.setConfSemis({eg1, eg2,wg1, wg2})
            setNextDisabled(false)
        }
    }

    return (
        <ScrollView style={{marginTop: 10, marginBottom: 100, flex: 1}}>
            <Button icon={"arrow-left"} disabled={false} onPress={() => props.setRound(p => p - 1)}>
                Back to First Round
            </Button>

            <View style={{flex: 1, flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
                <View style={{flexDirection: "column"}}>
                    <RadioButton.Group onValueChange={value => setWinner(setEg1, value)} value={eg1}>
                        <RadioButton.Item label={e1name} value={e1name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                        <RadioButton.Item label={e2name} value={e2name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                    </RadioButton.Group>
                </View>
                <Card style={{height: 50}}>
                    <Card.Content style={{justifyContent: "center", marginTop: -2}}>
                        <Paragraph ellipsizeMode='tail' numberOfLines={1} style={{width:100}}>
                            {eg1}
                        </Paragraph>
                    </Card.Content>
                </Card>
            </View>
            <Divider style={{height: 2}}/>

            <View style={{flex: 1, flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
                <View style={{flexDirection: "column"}}>
                    <RadioButton.Group onValueChange={value => setWinner(setEg2, value)} value={eg2}>
                        <RadioButton.Item label={e3name} value={e3name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                        <RadioButton.Item label={e4name} value={e4name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                    </RadioButton.Group>
                </View>
                <Card style={{height: 50}}>
                    <Card.Content style={{justifyContent: "center", marginTop: -2}}>
                        <Paragraph ellipsizeMode='tail' numberOfLines={1} style={{width:100}}>
                            {eg2}
                        </Paragraph>
                    </Card.Content>
                </Card>
            </View>
            <Divider style={{height: 2}}/>

            <View style={{flex: 1, flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
                <View style={{flexDirection: "column"}}>
                    <RadioButton.Group onValueChange={value => setWinner(setWg1, value)} value={wg1}>
                        <RadioButton.Item label={w1name} value={w1name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                        <RadioButton.Item label={w2name} value={w2name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                    </RadioButton.Group>
                </View>
                <Card style={{height: 50}}>
                    <Card.Content style={{justifyContent: "center", marginTop: -2}}>
                        <Paragraph ellipsizeMode='tail' numberOfLines={1} style={{width:100}}>
                            {wg1}
                        </Paragraph>
                    </Card.Content>
                </Card>
            </View>
            <Divider style={{height: 2}}/>

            <View style={{flex: 1, flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
                <View style={{flexDirection: "column"}}>
                    <RadioButton.Group onValueChange={value => setWinner(setWg2, value)} value={wg2}>
                        <RadioButton.Item label={w3name} value={w3name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                        <RadioButton.Item label={w4name} value={w4name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                    </RadioButton.Group>
                </View>
                <Card style={{height: 50}}>
                    <Card.Content style={{justifyContent: "center", marginTop: -2}}>
                        <Paragraph ellipsizeMode='tail' numberOfLines={1} style={{width:100}}>
                            {wg2}
                        </Paragraph>
                    </Card.Content>
                </Card>
            </View>
            <Divider style={{height: 2}}/>

            <Button icon={"arrow-right"} disabled={nextDisabled} onPress={() => props.setRound(p => p + 1)}>
                Conference Finals
            </Button>
        </ScrollView>
    );
}

const ConfFinals = (props) => {
    const {eg1: e1name, eg2: e2name, wg1: w1name, wg2: w2name} = props.teams

    const [eg1, setEg1] = useState('Pick a winner')
    const [wg1, setWg1] = useState('Pick a winner')

    const [nextDisabled, setNextDisabled] = useState(true)

    function setWinner(setter, winner) {
        setter(winner);
    }

    useEffect(tryNext, [eg1, wg1, nextDisabled])

    function tryNext() {
        if (![eg1, wg1].includes('Pick a winner')) {
            props.setNbaFinals({eg1, wg1})
            setNextDisabled(false)
        }
    }

    return (
        <ScrollView style={{marginTop: 10, marginBottom: 100, flex: 1}}>
            <Button icon={"arrow-left"} disabled={false} onPress={() => props.setRound(p => p - 1)}>
                Conference Semi-Finals
            </Button>

            <View style={{flex: 1, flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
                <View style={{flexDirection: "column"}}>
                    <RadioButton.Group onValueChange={value => setWinner(setEg1, value)} value={eg1}>
                        <RadioButton.Item label={e1name} value={e1name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                        <RadioButton.Item label={e2name} value={e2name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                    </RadioButton.Group>
                </View>
                <Card style={{height: 50}}>
                    <Card.Content style={{justifyContent: "center", marginTop: -2}}>
                        <Paragraph ellipsizeMode='tail' numberOfLines={1} style={{width:100}}>
                            {eg1}
                        </Paragraph>
                    </Card.Content>
                </Card>
            </View>
            <Divider style={{height: 2}}/>

            <View style={{flex: 1, flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
                <View style={{flexDirection: "column"}}>
                    <RadioButton.Group onValueChange={value => setWinner(setWg1, value)} value={wg1}>
                        <RadioButton.Item label={w1name} value={w1name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                        <RadioButton.Item label={w2name} value={w2name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                    </RadioButton.Group>
                </View>
                <Card style={{height: 50}}>
                    <Card.Content style={{justifyContent: "center", marginTop: -2}}>
                        <Paragraph ellipsizeMode='tail' numberOfLines={1} style={{width:100}}>
                            {wg1}
                        </Paragraph>
                    </Card.Content>
                </Card>
            </View>
            <Divider style={{height: 2}}/>

            <Button icon={"arrow-right"} disabled={nextDisabled} onPress={() => props.setRound(p => p + 1)}>
                NBA Finals
            </Button>
        </ScrollView>
    );
}

const NBAFinals = (props) => {
    const {eg1: e1name, wg1: w1name} = props.teams

    const [champion, setChampion] = useState('Pick a winner')

    const [nextDisabled, setNextDisabled] = useState(true)

    function setWinner(setter, winner) {
        setter(winner);
    }

    useEffect(tryNext, [champion, nextDisabled])

    function tryNext() {
        if (![champion].includes('Pick a winner')) {
            props.setNbaFinals({champion})
            setNextDisabled(false)
        }
    }

    return (
        <ScrollView style={{marginTop: 10, marginBottom: 100, flex: 1}}>
            <Button icon={"arrow-left"} disabled={false} onPress={() => props.setRound(p => p - 1)}>
                Back to Conference Finals
            </Button>

            <View style={{flex: 1, flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
                <View style={{flexDirection: "column"}}>
                    <RadioButton.Group onValueChange={value => setWinner(setChampion, value)} value={champion}>
                        <RadioButton.Item label={e1name} value={e1name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                        <RadioButton.Item label={w1name} value={w1name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                    </RadioButton.Group>
                </View>
                <Card style={{height: 50}}>
                    <Card.Content style={{justifyContent: "center", marginTop: -2}}>
                        <Paragraph ellipsizeMode='tail' numberOfLines={1} style={{width:100}}>
                            {champion}
                        </Paragraph>
                    </Card.Content>
                </Card>
            </View>
            <Divider style={{height: 2}}/>

            <Button icon={"arrow-right"} disabled={nextDisabled} onPress={() => props.setRound(p => p + 1)}>
                Submit your picks
            </Button>
        </ScrollView>
    );
}

const Overview = (props) => {

    function Team(props) {
        return (
            <Paragraph style={{textAlign: "center", color: "grey", fontSize: 14}} >{props.team}</Paragraph>
        );

    }

    return(
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-start', marginHorizontal: 10}}>
            <Subheading style={{textAlign: "center", paddingTop: 20, fontSize: 24}}>YOUR PICKS</Subheading>
            <View style={{flex: 2, flexDirection: 'row'}}>
                <View style={{flex: 3, flexDirection: 'column', justifyContent: 'space-around'}}>
                    <Team team={props.firstRound.eg1} />
                    <Team team={props.firstRound.eg2} />
                    <Team team={props.firstRound.eg3} />
                    <Team team={props.firstRound.eg4} />
                    <Team team={props.firstRound.wg1} />
                    <Team team={props.firstRound.wg2} />
                    <Team team={props.firstRound.wg3} />
                    <Team team={props.firstRound.wg4} />
                </View>
                <View style={{flex: 0, flexDirection: 'column', justifyContent: 'space-around'}}>
                    <Divider style={{width: 2, height: "18%"}}/>
                    <Divider style={{width: 2, height: "18%"}}/>
                    <Divider style={{width: 2, height: "18%"}}/>
                    <Divider style={{width: 2, height: "18%"}}/>
                </View>
                <View style={{flex: 3, flexDirection: 'column', justifyContent: 'space-around'}}>
                    <Team team={props.confSemis.eg1} />
                    <Team team={props.confSemis.eg2} />
                    <Team team={props.confSemis.wg1} />
                    <Team team={props.confSemis.wg2} />
                </View>
                <View style={{flex: 0, flexDirection: 'column', justifyContent: 'space-around'}}>
                    <Divider style={{width: 2, height: "30%"}}/>
                    <Divider style={{width: 2, height: "30%"}}/>
                </View>
                <View style={{flex: 3, flexDirection: 'column', justifyContent: 'space-around'}}>
                    <Team team={props.confFinals.eg1} />
                    <Team team={props.confFinals.wg1} />
                </View>
                <View style={{flex: 0, flexDirection: 'column', justifyContent: 'space-around'}}>
                    <Divider style={{width: 2, height: "55%"}}/>
                </View>
                <View style={{flex: 4, flexDirection: 'column', justifyContent: 'space-around'}}>
                    <Card style={{backgroundColor: "green", borderRadius: 25}}>
                        <Card.Content>
                            <Subheading style={{textAlign: "center", color: "white"}} >{props.nbaFinals.champion} </Subheading>
                        </Card.Content>
                    </Card>
                </View>
            </View>

        </View>
    );
}

