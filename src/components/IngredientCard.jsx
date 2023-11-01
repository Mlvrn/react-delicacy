import { Card, CardMedia } from '@mui/material';
import olive from '../assets/olive-oil.png';

const IngredientCard = ({ style }) => {
  return (
    <Card className={style.ingredient_card}>
      <div className={style.ingredient_card_background}>
        <CardMedia component="img" image={olive} alt="olive" />
      </div>
    </Card>
  );
};

export default IngredientCard;
