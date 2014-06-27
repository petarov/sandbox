package net.vexelon.osgi.ex02.math.impl;

import java.util.ArrayList;
import java.util.List;

import net.vexelon.osgi.ex02.math.Computable;

public class Sum implements Computable {
	
	List<Double> values = new ArrayList<>();
	
	public Computable add(double value) {
		values.add(value);
		return this;
	}

	@Override
	public double compute() {
		double sum = 0.0f;
		for (double value : values) {
			sum += value;
		}
		return sum;
	}

}
