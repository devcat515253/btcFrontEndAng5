export interface Commission {
  columns: [
    {
      logo: string;
      name: string;
    }
    ];
  data: [
    {
      logo: string;
      name: string;
      items: [
        {
          name: string;
          value: number;
          currency: string;
          logo: string;
        }
      ]
    }
  ];
}

