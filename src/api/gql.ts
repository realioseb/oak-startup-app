import { gql } from 'graphql.macro';

const phase = gql`
  fragment PhaseParts on Phase {
    id
    isComplete
    name
  }
`;

const task = gql`
  fragment TaskParts on Task {
    id
    isComplete
    name
    phase {
      id
    }
  }
`;

export const phaseListQuery = gql`
  ${phase}
  query {
    findPhases {
      ...PhaseParts
    }
  }
`;

export const phaseInsertMutation = gql`
  ${phase}
  mutation ($name: String!) {
    insertPhase(name: $name) {
      ...PhaseParts
    }
  }
`;

export const phaseUpdateMutation = gql`
  ${phase}
  mutation ($id: Int!, $name: String!) {
    updatePhase(id: $id, name: $name) {
      ...PhaseParts
    }
  }
`;
export const phaseRemoveMutation = gql`
  ${phase}
  mutation ($id: Int!) {
    removePhase(id: $id) {
      ...PhaseParts
    }
  }
`;

export const taskListQuery = gql`
  ${task}
  query {
    findTasks {
      ...TaskParts
    }
  }
`;

export const taskInsertMutation = gql`
  ${task}
  mutation ($name: String!, $phaseId: Int!) {
    insertTask(name: $name, phaseId: $phaseId) {
      ...TaskParts
    }
  }
`;

export const taskUpdatetMutation = gql`
  ${task}
  mutation ($id: Int!, $name: String!) {
    updateTask(id: $id, name: $name) {
      ...TaskParts
    }
  }
`;

export const taskRemoveMutation = gql`
  ${task}
  mutation ($id: Int!) {
    removeTask(id: $id) {
      ...TaskParts
    }
  }
`;

export const taskCompleteMutation = gql`
  ${task}
  mutation ($id: Int!) {
    completeTask(id: $id) {
      ...TaskParts
    }
  }
`;

export const taskIncompleteMutation = gql`
  ${task}
  mutation ($id: Int!) {
    incompleteTask(id: $id) {
      ...TaskParts
    }
  }
`;
