import React, { Component } from "react";
import { Query } from "react-apollo";
import Card from "./Card";
import { queryCharacters } from "./Queries";
import { genre, sort, species } from "./DropdownOptions";
import { Button, Dropdown, Icon, Input } from "semantic-ui-react";

export default class Gallery extends Component {
  state = {
    query: {
      page: 1,
      filter: {
        species: "",
        gender: "",
        name: ""
      }
    },
    info: {},
    sorting: ""
  };

  onChangeDropdown = (e, data) => {
    e.target.value = data.value;
    this.onChange(data.filter, e);
  };
  onChange = (filter, e) => {
    this.setState({
      query: {
        filter: { ...this.state.query.filter, [filter]: e.target.value }
      }
    });
  };

  render() {
    return (
      <div>
        <div className={"Paginator"}>
          <Button
            icon
            onClick={e => {
              if (this.state.info.pages === 1) return null;
              this.state.info.prev
                ? this.setState({
                    query: {
                      filter: { ...this.state.query.filter },
                      page: this.state.info.prev
                    }
                  })
                : this.setState({
                    query: {
                      filter: { ...this.state.query.filter },
                      page: this.state.info.pages
                    }
                  });
            }}
          >
            <Icon name="chevron left" />
          </Button>

          <span>
            page {this.state.query.page ? this.state.query.page : "1"}
          </span>

          <Button
            icon
            onClick={e => {
              if (this.state.info.pages === 1) return null;
              this.setState({
                query: {
                  filter: { ...this.state.query.filter },
                  page: this.state.info.next
                }
              });
            }}
          >
            <Icon name="chevron right" />
          </Button>
        </div>

        <div className={"Filters"}>
          <Dropdown
            placeholder="species"
            selection
            clearable
            options={species}
            onChange={this.onChangeDropdown}
            filter={`species`}
          />
          <Dropdown
            placeholder="gender"
            selection
            clearable
            options={genre}
            onChange={this.onChangeDropdown}
            filter={`gender`}
          />
          <Dropdown
            placeholder="asc/dsc"
            selection
            clearable
            options={sort}
            onChange={(e, data) => this.setState({ sorting: data.value })}
          />
        </div>

        <Query
          query={queryCharacters}
          variables={{
            page: this.state.query.page,
            species: this.state.query.filter.species,
            gender: this.state.query.filter.gender,
            name: this.state.query.filter.name
          }}
        >
          {({ error, loading, data }) => {
            if (error) return <div>Something is wrong...</div>;
            if (loading) return <div>Loading...</div>;

            this.state.info = data.characters.info;
            const characters = data.characters.results;
            if (!characters) return null;

            return (
              <div>
                <div className="Gallery">
                  {characters.map(character => (
                    <Card key={character.id} character={character} />
                  ))}
                </div>
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}
