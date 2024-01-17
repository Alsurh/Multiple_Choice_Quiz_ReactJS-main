// ResultsTable.js

import React from "react";

const ResultsTable = ({ questions, userAnswers }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Küsimus</th>
          <th>Resultaat</th>
        </tr>
      </thead>
      <tbody>
        {questions.map((question, index) => (
          <tr key={index}>
            <td>{`Number ${index + 1} Küsimus: ${question.text}`}</td>
            <td>{userAnswers[index] ? "Õige" : "Vale"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultsTable;
